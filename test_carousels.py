import os
import re
import urllib.request

def test_website():
    print("==================================================")
    print("TECH JAGANNATH - CAROUSEL & MARQUEE TEST SUITE")
    print("==================================================")

    # 1. Test Local Server Response
    try:
        req = urllib.request.urlopen("http://localhost:3000/index.html", timeout=5)
        status = req.getcode()
        html_content = req.read().decode('utf-8')
        print(f"[PASS] Local server responded with HTTP {status} (Content length: {len(html_content)} bytes)")
    except Exception as e:
        print(f"[FAIL] HTTP Request failed: {e}")
        return False

    # 2. Check essential element IDs for all carousels and marquees in index.html
    required_ids = [
        "heroSliderViewport", "heroSliderTrack", "heroTabsRail", "heroPrevBtn", "heroNextBtn",
        "partnersMarqueeWrapper", "partnersMarqueeTrack",
        "statsCarouselGrid",
        "productsCarouselViewport", "productsCarouselTrack", "productsCarouselPrev", "productsCarouselNext", "productsCarouselDots",
        "techMarqueeWrapper", "techMarqueeTrack",
        "teamCarouselViewport", "teamCarouselTrack", "teamCarouselPrev", "teamCarouselNext", "teamCarouselDots",
        "galleryFeaturedWrapper", "galleryFeaturedViewport", "galleryFeaturedTrack", "galleryPrevBtn", "galleryNextBtn", "galleryFeaturedDots",
        "galleryFilterBar", "galleryGrid", "galleryLightbox",
        "testimonialSliderWrapper", "testimonialSliderViewport", "testimonialSliderTrack", "testimonialPrevBtn", "testimonialNextBtn", "testimonialDots",
        "casesCarouselWrapper", "casesCarouselViewport", "casesCarouselTrack", "casesCarouselPrev", "casesCarouselNext"
    ]

    missing_ids = []
    for elem_id in required_ids:
        if f'id="{elem_id}"' not in html_content:
            missing_ids.append(elem_id)

    if not missing_ids:
        print(f"[PASS] All {len(required_ids)} required carousel, marquee, and slider element IDs are present in index.html")
    else:
        print(f"[FAIL] Missing IDs in index.html: {missing_ids}")
        return False

    # 3. Check data.js contents
    with open("data.js", "r", encoding="utf-8") as f:
        data_content = f.read()

    required_data_keys = [
        "heroSlides", "partners", "techStack", "achievements",
        "products", "team", "gallery", "galleryFeatured", "caseStudies", "testimonials"
    ]

    for key in required_data_keys:
        if key in data_content:
            print(f"[PASS] data.js contains dataset '{key}'")
        else:
            print(f"[FAIL] data.js missing dataset '{key}'")
            return False

    # 4. Check style.css classes
    with open("style.css", "r", encoding="utf-8") as f:
        css_content = f.read()

    required_classes = [
        ".hero-carousel-topbar", ".hero-tab-btn", ".tab-progress-fill",
        ".marquee-wrapper", ".marquee-track", "@keyframes continuousMarquee",
        ".tech-marquee-wrapper", ".tech-marquee-track",
        ".stats-carousel-grid", ".stat-achievement-card",
        ".products-carousel-viewport", ".product-3d-card",
        ".team-card", ".gallery-featured-wrapper",
        ".testimonial-slider-wrapper", ".testimonial-slide-card",
        ".cases-carousel-wrapper", ".case-carousel-card"
    ]

    for cls in required_classes:
        if cls in css_content:
            print(f"[PASS] style.css contains class/keyframe '{cls}'")
        else:
            print(f"[FAIL] style.css missing '{cls}'")
            return False

    # 5. Check main.js function initializations
    with open("main.js", "r", encoding="utf-8") as f:
        js_content = f.read()

    required_js_funcs = [
        "initHeroSlider", "initMarquees", "initProductsCarousel", "initTeamCarousel",
        "initGalleryFeaturedCarousel", "initGalleryAndLightbox", "initTestimonialsSlider",
        "initCasesCarousel"
    ]

    for func in required_js_funcs:
        if func in js_content:
            print(f"[PASS] main.js contains controller '{func}'")
        else:
            print(f"[FAIL] main.js missing '{func}'")
            return False

    print("==================================================")
    print("ALL TESTS PASSED! CAROUSELS & MARQUEES VERIFIED.")
    print("==================================================")
    return True

if __name__ == "__main__":
    test_website()
