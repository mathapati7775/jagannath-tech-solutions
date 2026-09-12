import urllib.request
import urllib.parse
import json

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
    print("TESTING LIVE AMAZON SES EMAIL TRANSMISSION")
    print("=" * 60)

    # 1. Test Book Demo
    demo_payload = {
        "name": "Jagannath Tech Test",
        "organization": "Jagannath Tech Solutions",
        "email": "info@techjagannath.com",
        "phone": "+918884047775",
        "topic": "TapAxe Smart Campus OS Demo",
        "demoDate": "2026-09-20",
        "demoTime": "Morning (10:00 AM - 1:00 PM IST)",
        "message": "Test email delivery from local website."
    }

    print("\n[1] Submitting Book Demo Test Request...")
    status, body = post_json("/api/consultation", demo_payload)
    print(f"  Response Status: HTTP {status}")
    print(f"  Success: {body.get('success')}")
    print(f"  Message: {body.get('message') or body.get('error')}")
    if body.get('bookingId'):
        print(f"  Reference ID: {body.get('bookingId')}")

    demo_passed = (status == 201 and body.get("success") is True)

    # 2. Test Contact Us
    contact_payload = {
        "name": "Jagannath Tech Test",
        "organization": "Jagannath Tech Solutions",
        "email": "info@techjagannath.com",
        "phone": "+918884047775",
        "subject": "Enterprise AI & RAG Engineering",
        "message": "Test contact inquiry delivery through Amazon SES to info@techjagannath.com."
    }

    print("\n[2] Submitting Contact Us Test Request...")
    status, body = post_json("/api/contact", contact_payload)
    print(f"  Response Status: HTTP {status}")
    print(f"  Success: {body.get('success')}")
    print(f"  Message: {body.get('message') or body.get('error')}")
    if body.get('inquiryId'):
        print(f"  Reference ID: {body.get('inquiryId')}")

    contact_passed = (status == 201 and body.get("success") is True)

    print("\n" + "=" * 60)
    print(f"Book Demo Test: {'PASS' if demo_passed else 'FAIL'}")
    print(f"Contact Us Test: {'PASS' if contact_passed else 'FAIL'}")
    print("=" * 60)

if __name__ == "__main__":
    main()
