/**
 * Jagannath Tech Solutions – Unified Fullstack Server
 * Serves static frontend assets and provides backend REST APIs
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const net = require('net');
const tls = require('tls');

// ─── Lightweight .env file loader ────────────────────────────────
(function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    try {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const eqIdx = trimmed.indexOf('=');
          if (eqIdx > 0) {
            const key = trimmed.slice(0, eqIdx).trim();
            const val = trimmed.slice(eqIdx + 1).trim();
            if (!process.env[key]) {
              process.env[key] = val.replace(/^["'](.*)["']$/, '$1');
            }
          }
        }
      });
    } catch (e) {
      console.warn('[ENV] Could not read .env file:', e.message);
    }
  }
})();

const PORT = process.env.PORT || 3000;
const HOST = 'localhost';
const PUBLIC_DIR = __dirname;
const DATA_DIR = path.join(__dirname, 'data_store');

// Ensure data storage directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// MIME Types Map
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.webmanifest': 'application/manifest+json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf'
};

// Helper: Read JSON Data File
function readDataFile(filename, defaultVal = []) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(`Error reading ${filename}:`, err.message);
  }
  return defaultVal;
}

// Helper: Save JSON Data File
function saveDataFile(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filename}:`, err.message);
    return false;
  }
}

// Helper: Parse Request Body JSON
function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        if (!body) return resolve({});
        const parsed = JSON.parse(body);
        resolve(parsed);
      } catch (err) {
        resolve({ raw: body });
      }
    });
    req.on('error', err => reject(err));
  });
}

// Helper: Send JSON Response
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

// Helper: Serve Static File
function serveStaticFile(req, res, filePath) {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // 404 handler
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <title>404 Not Found | Jagannath Tech Solutions</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0B0F19; color: #F8FAFC; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; }
            .box { max-width: 500px; padding: 40px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; }
            h1 { font-size: 4rem; margin: 0 0 10px; color: #6366F1; }
            p { color: #94A3B8; font-size: 1.1rem; }
            a { display: inline-block; margin-top: 20px; padding: 12px 24px; background: #6366F1; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="box">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The requested URL ${req.url} does not exist on this server.</p>
            <a href="/">← Return to Home</a>
          </div>
        </body>
        </html>
      `);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Cache control
    const headers = {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400'
    };

    res.writeHead(200, headers);
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
}

// ─── Real SMTP Client Transport ──────────────────────────────────
function sendSmtpMail({ host, port, user, pass, from, to, replyTo, subject, text, html }) {
  return new Promise((resolve, reject) => {
    const isSecure = port === 465;
    let currentSocket = null;
    let step = 0;
    let buffer = '';

    const cleanup = () => {
      if (currentSocket) {
        currentSocket.removeAllListeners();
        currentSocket.destroy();
      }
    };

    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error('SMTP connection timed out after 15 seconds'));
    }, 15000);

    const sendCmd = (cmd) => {
      if (currentSocket && currentSocket.writable) {
        currentSocket.write(cmd + '\r\n');
      }
    };

    const onData = (chunk) => {
      buffer += chunk.toString();
      const lines = buffer.split('\r\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (!line) continue;
        const code = parseInt(line.slice(0, 3), 10);
        if (isNaN(code)) continue;
        if (line.charAt(3) === '-') continue;

        if (step === 0 && code === 220) {
          step = 1;
          sendCmd('EHLO localhost');
        } else if (step === 1 && code === 250) {
          if (!isSecure && (port === 587 || port === 25 || port === 2587)) {
            step = 2;
            sendCmd('STARTTLS');
          } else {
            step = 3;
            sendCmd('AUTH LOGIN');
          }
        } else if (step === 2 && code === 220) {
          step = 2.5;
          const rawSocket = currentSocket;
          rawSocket.removeListener('data', onData);

          const tlsSocket = tls.connect({
            socket: rawSocket,
            host: host,
            servername: host,
            rejectUnauthorized: false
          }, () => {
            step = 1.5;
            sendCmd('EHLO localhost');
          });

          tlsSocket.on('error', (err) => {
            clearTimeout(timeout);
            cleanup();
            reject(err);
          });

          tlsSocket.on('data', onData);
          currentSocket = tlsSocket;
        } else if (step === 1.5 && code === 250) {
          step = 3;
          sendCmd('AUTH LOGIN');
        } else if (step === 3 && code === 334) {
          step = 4;
          sendCmd(Buffer.from(user).toString('base64'));
        } else if (step === 4 && code === 334) {
          step = 5;
          sendCmd(Buffer.from(pass).toString('base64'));
        } else if (step === 5 && code === 235) {
          const fromAddr = from.includes('<') ? from.match(/<([^>]+)>/)[1] : from;
          step = 6;
          sendCmd(`MAIL FROM:<${fromAddr}>`);
        } else if (step === 6 && code === 250) {
          step = 7;
          sendCmd(`RCPT TO:<${to}>`);
        } else if (step === 7 && code === 250) {
          step = 8;
          sendCmd('DATA');
        } else if (step === 8 && code === 354) {
          step = 9;
          const emailHeaders = [
            `From: ${from}`,
            `To: ${to}`,
            replyTo ? `Reply-To: ${replyTo}` : '',
            `Subject: ${subject}`,
            `Date: ${new Date().toUTCString()}`,
            `MIME-Version: 1.0`,
            `Content-Type: text/plain; charset=UTF-8`,
            '',
            text,
            '.'
          ].filter(Boolean).join('\r\n');
          sendCmd(emailHeaders);
        } else if (step === 9 && code === 250) {
          clearTimeout(timeout);
          sendCmd('QUIT');
          cleanup();
          resolve({ success: true, message: 'Delivered' });
        } else if (code >= 400) {
          clearTimeout(timeout);
          cleanup();
          reject(new Error(`SMTP server returned error ${code}: ${line}`));
        }
      }
    };

    try {
      if (isSecure) {
        currentSocket = tls.connect({ host, port, servername: host, rejectUnauthorized: false });
      } else {
        currentSocket = net.connect({ host, port });
      }
      currentSocket.on('data', onData);
      currentSocket.on('error', (err) => {
        clearTimeout(timeout);
        cleanup();
        reject(err);
      });
    } catch (connErr) {
      clearTimeout(timeout);
      return reject(connErr);
    }
  });
}

// Email Notification Dispatcher
async function dispatchEmailNotification({ subject, textBody, htmlBody, replyTo }) {
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'info@techjagannath.com';
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || 'info@techjagannath.com';

  // Verify SMTP availability
  if (!smtpHost || !smtpUser || !smtpPass) {
    console.error(`\n[EMAIL DISPATCH] ❌ SMTP EMAIL DELIVERY IS NOT CONFIGURED.`);
    console.error(`[EMAIL DISPATCH] Missing environment variables: ${[!smtpHost && 'SMTP_HOST', !smtpUser && 'SMTP_USER', !smtpPass && 'SMTP_PASS'].filter(Boolean).join(', ')}`);
    console.error(`[EMAIL DISPATCH] Target recipient is: ${receiverEmail}`);
    console.error(`[EMAIL DISPATCH] Notification was logged & stored in data_store, but live email was NOT dispatched to inbox.\n`);
    return {
      success: false,
      error: 'SMTP EMAIL DELIVERY IS NOT CONFIGURED',
      message: 'Unable to send your request right now. Please try again or contact us directly.',
      code: 'SMTP_NOT_CONFIGURED'
    };
  }

  console.log('╔═════════════════════════════════════════════════════════════════╗');
  console.log('║               TRANSMITTING EMAIL NOTIFICATION                   ║');
  console.log('╠═════════════════════════════════════════════════════════════════╣');
  console.log(`║  Recipient: ${receiverEmail}`);
  console.log(`║  Reply-To:  ${replyTo || 'N/A'}`);
  console.log(`║  Subject:   ${subject}`);
  console.log('╚═════════════════════════════════════════════════════════════════╝');

  try {
    console.log(`[EMAIL DISPATCH] Connecting to SMTP Host: ${smtpHost}:${smtpPort}...`);
    await sendSmtpMail({
      host: smtpHost,
      port: smtpPort,
      user: smtpUser,
      pass: smtpPass,
      from: smtpFrom,
      to: receiverEmail,
      replyTo,
      subject,
      text: textBody,
      html: htmlBody
    });
    console.log(`[EMAIL DISPATCH SUCCESS] Real email delivered to ${receiverEmail}`);
    return { success: true, receiver: receiverEmail };
  } catch (err) {
    console.error(`[EMAIL DISPATCH FAILURE] Real email delivery failed:`, err.message);
    return {
      success: false,
      error: `Email delivery failed: ${err.message}`,
      message: 'Unable to send your request right now. Please try again or contact us directly.',
      code: 'EMAIL_DELIVERY_FAILED'
    };
  }
}

// Anti-spam duplicate submission memory store
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

const startTime = Date.now();

// Server Request Handler
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  // ═══════════════════════════════════════════════════════════════════
  // BACKEND REST APIS
  // ═══════════════════════════════════════════════════════════════════

  // 1. Health Check API
  if (pathname === '/api/health' && req.method === 'GET') {
    return sendJson(res, 200, {
      status: 'healthy',
      service: 'Jagannath Tech Solutions Fullstack Engine',
      version: '2.0.0',
      uptimeSeconds: Math.floor((Date.now() - startTime) / 1000),
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      platform: process.platform,
      memoryUsage: process.memoryUsage()
    });
  }

  // 2. System Stats API
  if (pathname === '/api/stats' && req.method === 'GET') {
    const consultations = readDataFile('consultations.json');
    const inquiries = readDataFile('inquiries.json');
    const subscribers = readDataFile('subscribers.json');

    return sendJson(res, 200, {
      status: 'success',
      data: {
        activeUsers: '142,000+',
        institutions: '35+',
        provinces: '12+',
        uptime: '99.98%',
        totalConsultations: consultations.length,
        totalInquiries: inquiries.length,
        newsletterSubscribers: subscribers.length
      }
    });
  }

  // 3. Consultation & Book Demo API
  if ((pathname === '/api/consultation' || pathname === '/api/demo') && req.method === 'POST') {
    try {
      const body = await parseRequestBody(req);
      const { name, email, phone, organization, topic, demoDate, demoTime, message } = body;

      // Validation
      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return sendJson(res, 400, {
          success: false,
          error: 'Please provide a valid Full Name (at least 2 characters).'
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(String(email).trim())) {
        return sendJson(res, 400, {
          success: false,
          error: 'Please provide a valid work or corporate email address.'
        });
      }

      if (!phone || String(phone).replace(/\D/g, '').length < 7) {
        return sendJson(res, 400, {
          success: false,
          error: 'Please provide a valid Phone / WhatsApp number (at least 7 digits).'
        });
      }

      // Anti-duplicate check
      const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
      const dupKey = `demo_${email.toLowerCase()}_${topic}`;
      if (isDuplicate(dupKey, 20)) {
        return sendJson(res, 429, {
          success: false,
          error: 'A demo request with this email was just received. Please allow a few moments before submitting again.'
        });
      }

      const consultations = readDataFile('consultations.json');
      const newBooking = {
        id: 'DEMO-' + Date.now().toString(36).toUpperCase(),
        name: name.trim(),
        organization: organization ? organization.trim() : 'N/A',
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        topic: topic || 'General Architecture Consultation',
        demoDate: demoDate || 'Flexible / Next Available',
        demoTime: demoTime || 'Flexible',
        message: message ? message.trim() : '',
        clientIp,
        createdAt: new Date().toISOString(),
        status: 'PENDING_EMAIL_DISPATCH'
      };

      consultations.unshift(newBooking);
      saveDataFile('consultations.json', consultations);

      // Trigger email dispatch
      const subject = `[New Demo Request] ${newBooking.name} - ${newBooking.topic}`;
      const textBody = `
==================================================
NEW DEMO REQUEST - JAGANNATH TECH SOLUTIONS
==================================================
Reference ID:     ${newBooking.id}
Date & Time:      ${newBooking.createdAt}

Contact Details:
- Name:           ${newBooking.name}
- Email:          ${newBooking.email}
- Phone/WhatsApp: ${newBooking.phone}
- Organization:   ${newBooking.organization}

Demo Preferences:
- Product/Topic:  ${newBooking.topic}
- Preferred Date: ${newBooking.demoDate}
- Preferred Time: ${newBooking.demoTime}

Requirements & Message:
${newBooking.message || '(No extra notes provided)'}
==================================================
`;
      const emailResult = await dispatchEmailNotification({
        subject,
        textBody,
        replyTo: newBooking.email
      });

      if (!emailResult.success) {
        return sendJson(res, 503, {
          success: false,
          error: emailResult.message || 'Unable to send your request right now. Please try again or contact us directly.',
          code: emailResult.code
        });
      }

      newBooking.status = 'CONFIRMED_DISPATCHED';
      saveDataFile('consultations.json', consultations);

      return sendJson(res, 201, {
        success: true,
        message: 'Demo request received! Our engineering team will contact you shortly to confirm your scheduled slot.',
        bookingId: newBooking.id
      });
    } catch (err) {
      return sendJson(res, 500, { success: false, error: err.message });
    }
  }

  // 4. Contact Form Submission API
  if (pathname === '/api/contact' && req.method === 'POST') {
    try {
      const body = await parseRequestBody(req);
      const { name, email, phone, organization, subject, service, message } = body;

      // Validation
      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return sendJson(res, 400, {
          success: false,
          error: 'Please provide your Full Name (at least 2 characters).'
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(String(email).trim())) {
        return sendJson(res, 400, {
          success: false,
          error: 'Please provide a valid email address.'
        });
      }

      if (!message || typeof message !== 'string' || message.trim().length < 5) {
        return sendJson(res, 400, {
          success: false,
          error: 'Please provide your project requirements or query (at least 5 characters).'
        });
      }

      // Anti-duplicate check
      const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
      const dupKey = `contact_${email.toLowerCase()}`;
      if (isDuplicate(dupKey, 20)) {
        return sendJson(res, 429, {
          success: false,
          error: 'Your inquiry was recently submitted. Our team is already reviewing it.'
        });
      }

      const inquiries = readDataFile('inquiries.json');
      const newInquiry = {
        id: 'INQ-' + Date.now().toString(36).toUpperCase(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : 'N/A',
        organization: organization ? organization.trim() : 'N/A',
        subject: subject || service || 'General Inquiry',
        message: message.trim(),
        clientIp,
        createdAt: new Date().toISOString(),
        status: 'PENDING_EMAIL_DISPATCH'
      };

      inquiries.unshift(newInquiry);
      saveDataFile('inquiries.json', inquiries);

      // Trigger email dispatch
      const emailSubject = `[Website Inquiry] ${newInquiry.name} - ${newInquiry.subject}`;
      const textBody = `
==================================================
NEW WEBSITE INQUIRY - JAGANNATH TECH SOLUTIONS
==================================================
Inquiry ID:       ${newInquiry.id}
Date & Time:      ${newInquiry.createdAt}

Sender Information:
- Name:           ${newInquiry.name}
- Email:          ${newInquiry.email}
- Phone/WhatsApp: ${newInquiry.phone}
- Organization:   ${newInquiry.organization}
- Subject:        ${newInquiry.subject}

Message Content:
${newInquiry.message}
==================================================
`;
      const emailResult = await dispatchEmailNotification({
        subject: emailSubject,
        textBody,
        replyTo: newInquiry.email
      });

      if (!emailResult.success) {
        return sendJson(res, 503, {
          success: false,
          error: emailResult.message || 'Unable to send your request right now. Please try again or contact us directly.',
          code: emailResult.code
        });
      }

      newInquiry.status = 'CONFIRMED_DISPATCHED';
      saveDataFile('inquiries.json', inquiries);

      return sendJson(res, 201, {
        success: true,
        message: 'Thank you! Your request has been transmitted directly to our executive team. We will respond within 4 business hours.',
        inquiryId: newInquiry.id
      });
    } catch (err) {
      return sendJson(res, 500, { success: false, error: err.message });
    }
  }

  // 5. Newsletter Subscription API
  if (pathname === '/api/newsletter' && req.method === 'POST') {
    try {
      const body = await parseRequestBody(req);
      const { email } = body;

      if (!email || !email.includes('@')) {
        return sendJson(res, 400, {
          success: false,
          error: 'A valid email address is required.'
        });
      }

      const subscribers = readDataFile('subscribers.json');
      if (!subscribers.find(s => s.email.toLowerCase() === email.toLowerCase())) {
        subscribers.unshift({
          email: email.toLowerCase(),
          subscribedAt: new Date().toISOString()
        });
        saveDataFile('subscribers.json', subscribers);
      }

      console.log(`[API] Newsletter Subscriber: ${email}`);

      return sendJson(res, 200, {
        success: true,
        message: 'Successfully subscribed to Jagannath Tech Insights.'
      });
    } catch (err) {
      return sendJson(res, 500, { success: false, error: err.message });
    }
  }

  // 6. Consultations List API (GET)
  if (pathname === '/api/consultations' && req.method === 'GET') {
    const consultations = readDataFile('consultations.json');
    return sendJson(res, 200, { count: consultations.length, consultations });
  }

  // 7. Inquiries List API (GET)
  if (pathname === '/api/inquiries' && req.method === 'GET') {
    const inquiries = readDataFile('inquiries.json');
    return sendJson(res, 200, { count: inquiries.length, inquiries });
  }

  // ═══════════════════════════════════════════════════════════════════
  // FRONTEND STATIC FILE SERVING
  // ═══════════════════════════════════════════════════════════════════

  // Clean URL mapping
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = 'index.html';
  } else if (safePath === '/team' || safePath === '\\team') {
    safePath = 'team.html';
  } else if (safePath === '/gallery' || safePath === '\\gallery') {
    safePath = 'gallery.html';
  }

  // Resolve absolute file path
  let targetFilePath = path.join(PUBLIC_DIR, safePath);

  // If path has no extension and file exists as .html, serve that
  if (!path.extname(targetFilePath) && fs.existsSync(targetFilePath + '.html')) {
    targetFilePath += '.html';
  }

  // Serve static file
  serveStaticFile(req, res, targetFilePath);
});

// Start Server
server.listen(PORT, HOST, () => {
  console.log('╔═════════════════════════════════════════════════════════════════╗');
  console.log('║           JAGANNATH TECH SOLUTIONS - FULLSTACK SERVER           ║');
  console.log('╠═════════════════════════════════════════════════════════════════╣');
  console.log(`║  ► Frontend Application:  http://${HOST}:${PORT}/              ║`);
  console.log(`║  ► Team Page:             http://${HOST}:${PORT}/team.html       ║`);
  console.log(`║  ► Gallery Page:          http://${HOST}:${PORT}/gallery.html    ║`);
  console.log(`║  ► Backend Health API:    http://${HOST}:${PORT}/api/health     ║`);
  console.log(`║  ► Backend Stats API:     http://${HOST}:${PORT}/api/stats      ║`);
  console.log(`║  ► Backend Contact API:   http://${HOST}:${PORT}/api/contact    ║`);
  console.log(`║  ► Backend Consult API:   http://${HOST}:${PORT}/api/consultation║`);
  console.log('╚═════════════════════════════════════════════════════════════════╝');
  console.log(`[INFO] Server running smoothly at http://${HOST}:${PORT}/`);
});
