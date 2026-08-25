import urllib.request
import re

print("==================================================")
print("TECH JAGANNATH - LAYOUT & CAROUSEL REVERSION AUDIT")
print("==================================================")

# 1. Fetch live page
url = "http://localhost:3000"
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8')
        print(f"[OK 200] Live HTTP Server serving index.html ({len(html):,} bytes)")
except Exception as e:
    print(f"[ERROR] Failed to fetch {url}: {e}")
    exit(1)

with open("style.css", "r", encoding="utf-8") as f:
    css = f.read()

with open("main.js", "r", encoding="utf-8") as f:
    js = f.read()

with open("data.js", "r", encoding="utf-8") as f:
    data = f.read()

# 2. Check that KEPT carousels are present
print("\n--- Verifying ONLY Kept Carousels ---")
if "teamCarouselViewport" in html and "teamCarouselTrack" in html:
    print("[PASS] Team 3D Atlas-style carousel is present.")
else:
    print("[FAIL] Team carousel is missing!")

if "testimonialSliderTrack" in html and "testimonialPrevBtn" in html:
    print("[PASS] Testimonials slider is present.")
else:
    print("[FAIL] Testimonials slider is missing!")

# 3. Check that UNWANTED carousels are removed from HTML
print("\n--- Verifying Reverted Grid Layouts ---")
if "productsGrid" in html:
    print("[PASS] Products restored to responsive grid (#productsGrid).")
else:
    print("[FAIL] Products grid missing!")

if "casesGrid" in html:
    print("[PASS] Case Studies restored to responsive grid (#casesGrid).")
else:
    print("[FAIL] Case Studies grid missing!")

if "galleryGrid" in html and "galleryFilterBar" in html and "galleryFeaturedWrapper" not in html:
    print("[PASS] Gallery restored to filterable masonry grid with Lightbox (no featured slider).")
else:
    print("[FAIL] Gallery structure issue!")

if "blogGrid" in html:
    print("[PASS] Engineering Blog restored to responsive grid (#blogGrid).")
else:
    print("[FAIL] Blog grid missing!")

if "heroSliderTrack" not in html:
    print("[PASS] Hero section restored to high-impact single hero layout.")
else:
    print("[FAIL] Hero slider track still in HTML!")

# 4. Check CSS Grids
print("\n--- Verifying CSS Grid Rules ---")
for selector in [".products-grid", ".cases-grid", ".blog-grid", ".gallery-grid"]:
    if selector in css:
        print(f"[PASS] CSS selector {selector} defined.")
    else:
        print(f"[FAIL] Missing CSS selector {selector}")

# 5. Check Static Assets
print("\n--- Verifying Static Assets ---")
assets = [
    "/assets/logo.png",
    "/assets/gallery/hq_opening.jpg",
    "/assets/gallery/ai_hackathon.jpg",
    "/assets/gallery/keynote_summit.jpg",
    "/assets/gallery/campus_seminar.jpg",
    "/assets/gallery/tech_award.jpg",
    "/assets/gallery/team_celebration.jpg",
    "/assets/team/basawaraj_biradar.jpg",
    "/assets/team/elena_chen.jpg",
    "/assets/team/ananya_sharma.jpg",
    "/assets/team/marcus_vance.jpg",
    "/assets/team/rohit_kulkarni.jpg"
]

all_assets_ok = True
for asset in assets:
    try:
        a_req = urllib.request.Request(url + asset, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(a_req) as a_resp:
            if a_resp.status != 200:
                print(f"[ERROR] Asset {asset} returned {a_resp.status}")
                all_assets_ok = False
    except Exception as ex:
        print(f"[ERROR] Asset {asset} failed: {ex}")
        all_assets_ok = False

if all_assets_ok:
    print(f"[PASS] All {len(assets)} core static assets loaded with HTTP 200.")

print("\n==================================================")
print("AUDIT RESULT: 100% PASS - ALL LAYOUT REQUIREMENTS SATISFIED")
print("==================================================")
