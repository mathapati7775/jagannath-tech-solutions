import urllib.request
import urllib.parse
import json
import time

BASE_URL = "http://localhost:3000"

def post_json(endpoint, payload):
    url = f"{BASE_URL}{endpoint}"
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'}, method='POST')
    try:
        with urllib.request.urlopen(req) as resp:
            status = resp.getcode()
            body = json.loads(resp.read().decode('utf-8'))
            return status, body
    except urllib.error.HTTPError as e:
        body = json.loads(e.read().decode('utf-8'))
        return e.code, body
    except Exception as e:
        return 500, {"error": str(e)}

def main():
    print("=" * 60)
    print("VERIFYING EMAIL SUBMISSION BUG FIX (BOOK DEMO & CONTACT US)")
    print("=" * 60)

    ts = int(time.time())

    demo_payload = {
        "name": "Prof. Shrinivas Joshi",
        "organization": "NIT Karnataka",
        "email": f"shrinivas_{ts}@nitk.edu.in",
        "phone": "+91 94480 12345",
        "topic": "TapAxe Smart Campus OS Demo",
        "demoDate": "2026-09-25",
        "demoTime": "Afternoon",
        "message": "Interested in institutional pricing."
    }

    # 1. Test Book Demo
    print("\n[1] Testing Book Demo (/api/consultation)...")
    status, body = post_json("/api/consultation", demo_payload)
    print(f"  HTTP Status Code: {status}")
    print(f"  Response Body: {json.dumps(body, indent=2)}")
    if status == 201:
        assert body.get("success") is True, "Expected success to be True on 201"
        print(f"  [PASS] Successfully delivered via SES: ID {body.get('bookingId')}")
    else:
        assert status == 503, f"Expected HTTP 201 or 503 but got {status}"
        assert body.get("success") is False, "Expected success to be False"
        assert body.get("code") in ["SMTP_NOT_CONFIGURED", "EMAIL_DELIVERY_FAILED"], f"Unexpected error code: {body.get('code')}"
        print(f"  [PASS] Correctly returns 503 ({body.get('code')}) and no fake success")

    # 2. Test Contact Us
    contact_payload = {
        "name": "Mr. Vinay Kulkarni",
        "email": f"vinay_{ts}@enterprise-solutions.com",
        "phone": "+91 98860 54321",
        "organization": "Enterprise AI Labs",
        "subject": "Enterprise Cloud Migration",
        "message": "We need consulting on multi-cloud AWS RAG system architecture."
    }

    print("\n[2] Testing Contact Us (/api/contact)...")
    status, body = post_json("/api/contact", contact_payload)
    print(f"  HTTP Status Code: {status}")
    print(f"  Response Body: {json.dumps(body, indent=2)}")
    if status == 201:
        assert body.get("success") is True, "Expected success to be True on 201"
        print(f"  [PASS] Successfully delivered via SES: ID {body.get('inquiryId')}")
    else:
        assert status == 503, f"Expected HTTP 201 or 503 but got {status}"
        assert body.get("success") is False, "Expected success to be False"
        assert body.get("code") in ["SMTP_NOT_CONFIGURED", "EMAIL_DELIVERY_FAILED"], f"Unexpected error code: {body.get('code')}"
        print(f"  [PASS] Correctly returns 503 ({body.get('code')}) and no fake success")

    # 3. Test Validation Rejection (Expect 400)
    print("\n[3] Testing Backend Validation (Missing Name)...")
    invalid_demo = {**demo_payload, "name": ""}
    status, body = post_json("/api/consultation", invalid_demo)
    print(f"  HTTP Status Code: {status} ({body.get('error')})")
    assert status == 400, f"Expected 400 but got {status}"
    print("  [PASS] Validation correctly rejects empty name with 400")

    # 4. Test Invalid Email Rejection (Expect 400)
    print("\n[4] Testing Backend Validation (Invalid Email)...")
    invalid_email = {**contact_payload, "email": "invalid-email-address"}
    status, body = post_json("/api/contact", invalid_email)
    print(f"  HTTP Status Code: {status} ({body.get('error')})")
    assert status == 400, f"Expected 400 but got {status}"
    print("  [PASS] Validation correctly rejects bad email with 400")

    print("\n" + "=" * 60)
    print("ALL EMAIL BUG FIX API CHECKS PASSED PERFECTLY!")
    print("=" * 60)

if __name__ == "__main__":
    main()
