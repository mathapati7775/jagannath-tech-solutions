/**
 * Local Unit Test Suite for AWS Lambda Handler
 * Tests all Lambda routes, validation rules, error handling, and SES command formatting without sending real emails.
 */

const { handler } = require('./api-handler');

// Mock SES Client for non-destructive local testing
class MockSESClient {
  constructor(shouldFail = false) {
    this.shouldFail = shouldFail;
    this.sentCommands = [];
  }

  async send(command) {
    if (this.shouldFail) {
      throw new Error('Mock SES sending error (e.g. Account suspended or Sandbox limit)');
    }
    this.sentCommands.push(command);
    return {
      MessageId: 'mock-ses-msg-' + Math.random().toString(36).substring(2)
    };
  }
}

async function runLambdaTests() {
  console.log('============================================================');
  console.log('AWS LAMBDA HANDLER LOCAL VERIFICATION SUITE');
  console.log('============================================================');

  let passedCount = 0;
  let totalTests = 0;

  function assert(condition, desc) {
    totalTests++;
    if (condition) {
      console.log(`  [PASS] ${desc}`);
      passedCount++;
    } else {
      console.error(`  [FAIL] ${desc}`);
      process.exitCode = 1;
    }
  }

  // ─── 1. TEST GET /api/health ──────────────────────────────────
  console.log('\n[1] Testing GET /api/health...');
  const healthEvent = {
    rawPath: '/api/health',
    requestContext: { http: { method: 'GET', path: '/api/health' } }
  };
  const healthRes = await handler(healthEvent, {});
  const healthBody = JSON.parse(healthRes.body);
  assert(healthRes.statusCode === 200, 'Health endpoint returns HTTP 200');
  assert(healthBody.status === 'healthy', 'Health status is healthy');
  assert(healthBody.region === 'ap-south-1', 'Health region is ap-south-1');

  // ─── 2. TEST POST /api/consultation (Valid Demo Request) ──────
  console.log('\n[2] Testing POST /api/consultation (Valid Demo Request)...');
  const mockSES = new MockSESClient(false);
  const demoEvent = {
    rawPath: '/api/consultation',
    requestContext: { http: { method: 'POST', path: '/api/consultation' } },
    body: JSON.stringify({
      name: 'Dr. Ramesh Patil',
      organization: 'Karnataka Engineering College',
      email: 'ramesh.patil@kec.edu.in',
      phone: '+91 98765 43210',
      topic: 'TapAxe Smart Campus OS Demo',
      demoDate: '2026-09-20',
      demoTime: 'Morning (10:00 AM - 1:00 PM IST)',
      message: 'Looking to deploy TapAxe across 4 campuses with 8,000 students.'
    })
  };
  const demoRes = await handler(demoEvent, {}, mockSES);
  const demoBody = JSON.parse(demoRes.body);
  assert(demoRes.statusCode === 201, 'Book Demo returns HTTP 201 on success');
  assert(demoBody.success === true, 'Book Demo response success is true');
  assert(demoBody.bookingId && demoBody.bookingId.startsWith('DEMO-'), 'Book Demo returns generated DEMO- Reference ID');
  assert(mockSES.sentCommands.length === 1, 'SES SendEmailCommand was dispatched exactly once');

  // ─── 3. TEST POST /api/consultation (Validation Errors) ────────
  console.log('\n[3] Testing POST /api/consultation (Validation Errors)...');
  const invalidDemoEvent = {
    rawPath: '/api/consultation',
    requestContext: { http: { method: 'POST' } },
    body: JSON.stringify({
      name: 'R', // Too short
      email: 'invalid-email',
      phone: '123'
    })
  };
  const invDemoRes = await handler(invalidDemoEvent, {}, mockSES);
  assert(invDemoRes.statusCode === 400, 'Invalid name rejected with HTTP 400');

  // ─── 4. TEST POST /api/contact (Valid Contact Inquiry) ────────
  console.log('\n[4] Testing POST /api/contact (Valid Contact Inquiry)...');
  const mockSES2 = new MockSESClient(false);
  const contactEvent = {
    rawPath: '/api/contact',
    requestContext: { http: { method: 'POST', path: '/api/contact' } },
    body: JSON.stringify({
      name: 'Sarah Jenkins',
      email: 'sarah.j@globaltech.com',
      phone: '+91 99887 76655',
      organization: 'Global Tech Innovations',
      subject: 'Custom Enterprise AI & RAG Engineering',
      message: 'We would like to consult on architecting a custom LLM RAG pipeline on AWS.'
    })
  };
  const contactRes = await handler(contactEvent, {}, mockSES2);
  const contactBody = JSON.parse(contactRes.body);
  assert(contactRes.statusCode === 201, 'Contact Us returns HTTP 201 on success');
  assert(contactBody.success === true, 'Contact Us response success is true');
  assert(contactBody.inquiryId && contactBody.inquiryId.startsWith('INQ-'), 'Contact Us returns generated INQ- Reference ID');
  assert(mockSES2.sentCommands.length === 1, 'SES SendEmailCommand was dispatched for Contact inquiry');

  // ─── 5. TEST POST /api/contact (Validation Errors) ────────────
  console.log('\n[5] Testing POST /api/contact (Validation Errors)...');
  const invalidContactEvent = {
    rawPath: '/api/contact',
    requestContext: { http: { method: 'POST' } },
    body: JSON.stringify({
      name: 'Sarah',
      email: 'sarah@globaltech.com',
      message: '' // Missing message
    })
  };
  const invContactRes = await handler(invalidContactEvent, {}, mockSES2);
  assert(invContactRes.statusCode === 400, 'Missing message rejected with HTTP 400');

  // ─── 6. TEST Error Handling (When SES Fails) ───────────────────
  console.log('\n[6] Testing Error Handling (When SES Fails)...');
  const failingSES = new MockSESClient(true);
  const failingDemoEvent = {
    rawPath: '/api/consultation',
    requestContext: { http: { method: 'POST' } },
    body: JSON.stringify({
      name: 'Test Failure User',
      email: 'user@failuretest.com',
      phone: '+91 99999 88888',
      message: 'Testing error handling'
    })
  };
  const failRes = await handler(failingDemoEvent, {}, failingSES);
  const failBody = JSON.parse(failRes.body);
  assert(failRes.statusCode === 503, 'SES failure returns HTTP 503');
  assert(failBody.success === false, 'SES failure response success is false');
  assert(failBody.code === 'SES_DISPATCH_FAILED', 'SES failure code is SES_DISPATCH_FAILED');

  // ─── 7. TEST CORS Preflight (OPTIONS) ──────────────────────────
  console.log('\n[7] Testing CORS Preflight (OPTIONS)...');
  const optionsEvent = {
    rawPath: '/api/consultation',
    requestContext: { http: { method: 'OPTIONS' } }
  };
  const optionsRes = await handler(optionsEvent, {});
  assert(optionsRes.statusCode === 204, 'OPTIONS preflight returns HTTP 204');
  assert(optionsRes.headers['Access-Control-Allow-Origin'] === '*', 'CORS origin is *');

  // ─── 8. TEST Unknown Route (404) ──────────────────────────────
  console.log('\n[8] Testing Unknown Route (404)...');
  const notFoundEvent = {
    rawPath: '/api/nonexistent',
    requestContext: { http: { method: 'GET' } }
  };
  const notFoundRes = await handler(notFoundEvent, {});
  assert(notFoundRes.statusCode === 404, 'Unknown route returns HTTP 404');

  console.log('\n============================================================');
  console.log(`LAMBDA SUITE RESULTS: ${passedCount}/${totalTests} TESTS PASSED`);
  console.log('============================================================');

  if (passedCount !== totalTests) {
    process.exit(1);
  }
}

runLambdaTests().catch(err => {
  console.error('Fatal Test Runner Error:', err);
  process.exit(1);
});
