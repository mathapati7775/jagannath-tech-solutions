/**
 * Jagannath Tech Solutions – Serverless API & Amazon SES Email Dispatcher
 * AWS Lambda Handler (Node.js 18.x / 20.x runtime)
 * Region: ap-south-1 (Mumbai)
 */

let SESClient, SendEmailCommand;
try {
  const sesModule = require('@aws-sdk/client-ses');
  SESClient = sesModule.SESClient;
  SendEmailCommand = sesModule.SendEmailCommand;
} catch (err) {
  // Fallback for local unit test environments without installed AWS SDK package
  SESClient = class FallbackSESClient {
    constructor(opts) { this.region = (opts && opts.region) || 'ap-south-1'; }
    async send(cmd) { return { MessageId: 'local-test-id' }; }
  };
  SendEmailCommand = class FallbackSendEmailCommand {
    constructor(input) { this.input = input; }
  };
}

// Initialize SES Client in ap-south-1 using IAM execution role
const REGION = process.env.AWS_REGION || 'ap-south-1';
const sesClient = new SESClient({ region: REGION });

// Configuration (Non-secret defaults, overridable by Lambda Environment Variables)
const RECEIVER_EMAIL = process.env.CONTACT_RECEIVER_EMAIL || 'info@techjagannath.com';
const FROM_EMAIL = process.env.SES_FROM_EMAIL || 'info@techjagannath.com';

// Standard CORS Headers for API Gateway responses
const CORS_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
};

// Helper: Format Lambda Response
function buildResponse(statusCode, data) {
  return {
    statusCode,
    headers: CORS_HEADERS,
    body: JSON.stringify(data)
  };
}

// Helper: Safely parse event body
function parseBody(event) {
  if (!event.body) return {};
  try {
    const raw = event.isBase64Encoded
      ? Buffer.from(event.body, 'base64').toString('utf8')
      : event.body;
    return typeof raw === 'string' ? JSON.parse(raw) : raw;
  } catch (err) {
    return {};
  }
}

// Anti-duplicate memory cache within Lambda container lifecycle
const recentSubmissions = new Map();
function isDuplicate(key, windowSeconds = 15) {
  const now = Date.now();
  if (recentSubmissions.has(key)) {
    const prev = recentSubmissions.get(key);
    if (now - prev < windowSeconds * 1000) {
      return true;
    }
  }
  recentSubmissions.set(key, now);
  return false;
}

/**
 * Main Lambda Entrypoint
 * Compatible with API Gateway HTTP API (Payload v2.0), REST API (v1.0), and Lambda Function URLs
 */
exports.handler = async (event, context, customSesClient = null) => {
  // Normalize HTTP method and request path
  const method = (
    (event.requestContext && event.requestContext.http && event.requestContext.http.method) ||
    event.httpMethod ||
    'GET'
  ).toUpperCase();

  const rawPath = (
    event.rawPath ||
    event.path ||
    (event.requestContext && event.requestContext.http && event.requestContext.http.path) ||
    '/'
  ).toLowerCase();

  // Strip trailing slashes and redundant prefixes
  const normalizedPath = rawPath.replace(/\/+$/, '') || '/';

  // Handle CORS Preflight (OPTIONS)
  if (method === 'OPTIONS') {
    return buildResponse(204, {});
  }

  // 1. Health Check Endpoint (GET /api/health)
  if ((normalizedPath === '/api/health' || normalizedPath === '/health') && method === 'GET') {
    return buildResponse(200, {
      status: 'healthy',
      service: 'Jagannath Tech Solutions Serverless Backend',
      region: REGION,
      receiver: RECEIVER_EMAIL,
      timestamp: new Date().toISOString()
    });
  }

  // 2. Book a Demo / Consultation Endpoint (POST /api/consultation or /api/demo)
  if (
    (normalizedPath === '/api/consultation' ||
      normalizedPath === '/api/demo' ||
      normalizedPath === '/consultation' ||
      normalizedPath === '/demo') &&
    method === 'POST'
  ) {
    try {
      const body = parseBody(event);
      const { name, email, phone, organization, topic, demoDate, demoTime, message } = body;

      // Backend Validation
      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return buildResponse(400, {
          success: false,
          error: 'Please provide a valid Full Name (at least 2 characters).'
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(String(email).trim())) {
        return buildResponse(400, {
          success: false,
          error: 'Please provide a valid work or corporate email address.'
        });
      }

      if (!phone || String(phone).replace(/\D/g, '').length < 7) {
        return buildResponse(400, {
          success: false,
          error: 'Please provide a valid Phone / WhatsApp number (at least 7 digits).'
        });
      }

      // Anti-duplicate protection
      const clientIp =
        (event.requestContext && event.requestContext.http && event.requestContext.http.sourceIp) ||
        (event.headers && (event.headers['x-forwarded-for'] || event.headers['X-Forwarded-For'])) ||
        'unknown';
      const dupKey = `demo_${email.toLowerCase().trim()}_${topic || 'gen'}`;
      if (isDuplicate(dupKey, 15)) {
        return buildResponse(429, {
          success: false,
          error: 'A demo request with this email was just received. Please allow a few moments before submitting again.'
        });
      }

      const bookingId = 'DEMO-' + Date.now().toString(36).toUpperCase();
      const createdAt = new Date().toISOString();

      const subject = `[New Demo Request] ${name.trim()} - ${topic || 'General Architecture Consultation'}`;
      const textBody = `
==================================================
NEW DEMO REQUEST - JAGANNATH TECH SOLUTIONS
==================================================
Reference ID:     ${bookingId}
Date & Time:      ${createdAt}

Contact Details:
- Name:           ${name.trim()}
- Email:          ${email.trim()}
- Phone/WhatsApp: ${phone.trim()}
- Organization:   ${organization ? organization.trim() : 'N/A'}

Demo Preferences:
- Product/Topic:  ${topic || 'General Architecture Consultation'}
- Preferred Date: ${demoDate || 'Flexible / Next Available'}
- Preferred Time: ${demoTime || 'Flexible'}

Requirements & Message:
${message ? message.trim() : '(No extra notes provided)'}
==================================================
`;

      const sendParams = {
        Source: FROM_EMAIL,
        Destination: {
          ToAddresses: [RECEIVER_EMAIL]
        },
        ReplyToAddresses: [email.trim()],
        Message: {
          Subject: {
            Data: subject,
            Charset: 'UTF-8'
          },
          Body: {
            Text: {
              Data: textBody,
              Charset: 'UTF-8'
            }
          }
        }
      };

      const client = customSesClient || sesClient;
      await client.send(new SendEmailCommand(sendParams));

      return buildResponse(201, {
        success: true,
        message: 'Demo request received! Our engineering team will contact you shortly to confirm your scheduled slot.',
        bookingId
      });
    } catch {
      return buildResponse(503, {
        success: false,
        error: 'Unable to send your request right now. Please try again or contact info@techjagannath.com directly.',
        code: 'SES_DISPATCH_FAILED'
      });
    }
  }

  // 3. Contact Us Form Endpoint (POST /api/contact)
  if (
    (normalizedPath === '/api/contact' || normalizedPath === '/contact') &&
    method === 'POST'
  ) {
    try {
      const body = parseBody(event);
      const { name, email, phone, organization, subject: reqSubject, service, message } = body;

      // Backend Validation
      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return buildResponse(400, {
          success: false,
          error: 'Please provide your Full Name (at least 2 characters).'
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(String(email).trim())) {
        return buildResponse(400, {
          success: false,
          error: 'Please provide a valid email address.'
        });
      }

      if (!message || typeof message !== 'string' || message.trim().length < 5) {
        return buildResponse(400, {
          success: false,
          error: 'Please provide your project requirements or query (at least 5 characters).'
        });
      }

      // Anti-duplicate protection
      const dupKey = `contact_${email.toLowerCase().trim()}`;
      if (isDuplicate(dupKey, 15)) {
        return buildResponse(429, {
          success: false,
          error: 'Your inquiry was recently submitted. Our team is already reviewing it.'
        });
      }

      const inquiryId = 'INQ-' + Date.now().toString(36).toUpperCase();
      const createdAt = new Date().toISOString();
      const resolvedSubject = reqSubject || service || 'General Inquiry';

      const emailSubject = `[Website Inquiry] ${name.trim()} - ${resolvedSubject}`;
      const textBody = `
==================================================
NEW WEBSITE INQUIRY - JAGANNATH TECH SOLUTIONS
==================================================
Inquiry ID:       ${inquiryId}
Date & Time:      ${createdAt}

Sender Information:
- Name:           ${name.trim()}
- Email:          ${email.trim()}
- Phone/WhatsApp: ${phone ? phone.trim() : 'N/A'}
- Organization:   ${organization ? organization.trim() : 'N/A'}
- Subject:        ${resolvedSubject}

Message Content:
${message.trim()}
==================================================
`;

      const sendParams = {
        Source: FROM_EMAIL,
        Destination: {
          ToAddresses: [RECEIVER_EMAIL]
        },
        ReplyToAddresses: [email.trim()],
        Message: {
          Subject: {
            Data: emailSubject,
            Charset: 'UTF-8'
          },
          Body: {
            Text: {
              Data: textBody,
              Charset: 'UTF-8'
            }
          }
        }
      };

      const client = customSesClient || sesClient;
      await client.send(new SendEmailCommand(sendParams));

      return buildResponse(201, {
        success: true,
        message: 'Thank you! Your request has been transmitted directly to our executive team. We will respond within 4 business hours.',
        inquiryId
      });
    } catch {
      return buildResponse(503, {
        success: false,
        error: 'Unable to send your request right now. Please try again or contact info@techjagannath.com directly.',
        code: 'SES_DISPATCH_FAILED'
      });
    }
  }

  // Fallback 404 for unknown routes
  return buildResponse(404, {
    success: false,
    error: `Route ${method} ${rawPath} not found on this serverless API.`
  });
};
