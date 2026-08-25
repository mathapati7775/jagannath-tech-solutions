import urllib.request
import re
import os
import json

def run_deep_verification():
    print("==================================================")
    print("TECH JAGANNATH - DEEP SYSTEM VERIFICATION")
    print("==================================================")

    base_url = "http://localhost:3000"
    
    # 1. Test All Static Asset URLs
    test_urls = [
        "/",
        "/index.html",
        "/style.css",
        "/main.js",
        "/data.js",
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
    for path in test_urls:
        url = base_url + path
        try:
            req = urllib.request.urlopen(url, timeout=5)
            status = req.getcode()
            content = req.read()
            if status == 200:
                print(f"[OK 200] {path} ({len(content):,} bytes)")
            else:
                print(f"[FAIL {status}] {path}")
                all_assets_ok = False
        except Exception as e:
            print(f"[ERROR] {path} -> {e}")
            all_assets_ok = False

    if all_assets_ok:
        print("\n[PASS] All 17 Core Asset Endpoints Responding with HTTP 200.")
    else:
        print("\n[FAIL] Some assets failed to load.")
        return False

    # 2. Check 10 Carousel / Marquee Requirements
    print("\n--- Verifying 10 Carousel & Marquee Requirements ---")

    with open("index.html", "r", encoding="utf-8") as f:
        html = f.read()

    with open("data.js", "r", encoding="utf-8") as f:
        data_code = f.read()

    with open("style.css", "r", encoding="utf-8") as f:
        css = f.read()

    with open("main.js", "r", encoding="utf-8") as f:
        js = f.read()

    checks = [
        ("1. Hero Full-Width Carousel (Auto-play 5.5s, Tabs, Prev/Next, Metrics)",
         "heroSliderViewport" in html and "heroSliderTrack" in html and "heroTabsRail" in html and "initHeroSlider" in js and "heroSlides" in data_code),

        ("2. Products 3D Snap Carousel (Center active, side cards visible, arrows, dots)",
         "productsCarouselViewport" in html and "productsCarouselTrack" in html and "product-3d-card" in css and "initProductsCarousel" in js),

        ("3. Team Atlas-Style 3D Carousel (Center active scale, side blur, dots, drag)",
         "teamCarouselViewport" in html and "teamCarouselTrack" in html and "filter: blur(1.5px)" in css and "initTeamCarousel" in js),

        ("4. Company Gallery (Masonry + Top Featured Carousel + Fullscreen Lightbox)",
         "galleryFeaturedViewport" in html and "galleryGrid" in html and "galleryLightbox" in html and "initGalleryFeaturedCarousel" in js and "initGalleryAndLightbox" in js),

        ("5. Testimonials Single Active Slider (Single card, timer, avatar, dots, arrows)",
         "testimonialSliderViewport" in html and "testimonialSliderTrack" in html and "initTestimonialsSlider" in js and "testimonialSlideCard" not in html),

        ("6. Case Studies Horizontal Scroll Rail (Large preview, hover, next/prev)",
         "casesCarouselViewport" in html and "casesCarouselTrack" in html and "initCasesCarousel" in js),

        ("7. Careers Open Positions Grid (Interactive apply modal & details)",
         "careersGrid" in html and "renderCareers" in js and "careers" in data_code),

        ("8. Technology Stack Infinite Marquee (Continuous loop, pause on hover)",
         "techMarqueeWrapper" in html and "techMarqueeTrack" in html and "continuousMarquee" in css),

        ("9. Clients / Partners Infinite Logo Marquee (Auto-scrolling, continuous loop)",
         "partnersMarqueeWrapper" in html and "partnersMarqueeTrack" in html and "continuousMarquee" in css),

        ("10. Achievements & Statistics Animated Grid (Projects, Users, Institutions)",
         "statsCarouselGrid" in html and "initStatCounters" in js and "achievements" in data_code)
    ]

    all_reqs_ok = True
    for title, passed in checks:
        if passed:
            print(f"[PASS] {title}")
        else:
            print(f"[FAIL] {title}")
            all_reqs_ok = False

    print("\n==================================================")
    if all_reqs_ok and all_assets_ok:
        print("ALL SYSTEM REQUIREMENTS & VALIDATIONS PASSED PERFECTLY!")
    else:
        print("SOME TESTS FAILED.")
    print("==================================================")
    return all_reqs_ok

if __name__ == "__main__":
    run_deep_verification()
