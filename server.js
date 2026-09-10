/**
 * Jagannath Tech Solutions – Unified Fullstack Server
 * Serves static frontend assets and provides backend REST APIs
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

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

  // 3. Consultation Booking API
  if (pathname === '/api/consultation' && req.method === 'POST') {
    try {
      const body = await parseRequestBody(req);
      const { name, email, phone, topic, message } = body;

      if (!name || !email) {
        return sendJson(res, 400, {
          success: false,
          error: 'Name and email are required fields.'
        });
      }

      const consultations = readDataFile('consultations.json');
      const newBooking = {
        id: 'CONS-' + Date.now().toString(36).toUpperCase(),
        name,
        email,
        phone: phone || 'N/A',
        topic: topic || 'General Architecture Consultation',
        message: message || '',
        createdAt: new Date().toISOString(),
        status: 'CONFIRMED'
      };

      consultations.unshift(newBooking);
      saveDataFile('consultations.json', consultations);

      console.log(`[API] New Consultation: ${name} (${email}) - ${newBooking.topic}`);

      return sendJson(res, 201, {
        success: true,
        message: 'Consultation confirmed! Our engineering team will contact you shortly.',
        booking: newBooking
      });
    } catch (err) {
      return sendJson(res, 500, { success: false, error: err.message });
    }
  }

  // 4. Contact Form Submission API
  if (pathname === '/api/contact' && req.method === 'POST') {
    try {
      const body = await parseRequestBody(req);
      const { name, email, phone, service, budget, message } = body;

      if (!name || !email || !message) {
        return sendJson(res, 400, {
          success: false,
          error: 'Name, email, and message are required.'
        });
      }

      const inquiries = readDataFile('inquiries.json');
      const newInquiry = {
        id: 'INQ-' + Date.now().toString(36).toUpperCase(),
        name,
        email,
        phone: phone || 'N/A',
        service: service || 'General Inquiry',
        budget: budget || 'Undisclosed',
        message,
        createdAt: new Date().toISOString()
      };

      inquiries.unshift(newInquiry);
      saveDataFile('inquiries.json', inquiries);

      console.log(`[API] New Inquiry: ${name} (${email}) - Service: ${newInquiry.service}`);

      return sendJson(res, 201, {
        success: true,
        message: 'Thank you for reaching out! We will respond within 24 business hours.',
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
