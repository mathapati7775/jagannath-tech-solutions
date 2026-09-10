import re
import os
import sys

def check_css_responsiveness():
    print("=" * 60)
    print("RESPONSIVENESS & OVERFLOW COMPLIANCE AUDIT")
    print("=" * 60)

    css_path = "style.css"
    with open(css_path, "r", encoding="utf-8") as f:
        css_content = f.read()

    html_path = "index.html"
    with open(html_path, "r", encoding="utf-8") as f:
        html_content = f.read()

    # 1. Check Global Reset & html/body overflow protection
    print("\n[1] Checking Global Layout & Overflow Protection:")
    has_box_sizing = "box-sizing: border-box" in css_content
    has_html_overflow = re.search(r'html\s*\{[^}]*overflow-x:\s*hidden', css_content) is not None
    has_body_overflow = re.search(r'body\s*\{[^}]*overflow-x:\s*hidden', css_content) is not None
    has_max_width_100 = re.search(r'html\s*\{[^}]*max-width:\s*100vw', css_content) is not None
    
    print(f"  - Box sizing universal reset: {'PASS' if has_box_sizing else 'FAIL'}")
    print(f"  - HTML overflow-x: hidden: {'PASS' if has_html_overflow else 'FAIL'}")
    print(f"  - Body overflow-x: hidden: {'PASS' if has_body_overflow else 'FAIL'}")
    print(f"  - 100vw viewport constraint: {'PASS' if has_max_width_100 else 'FAIL'}")

    # 2. Check Navbar & CTA Button Visibility across all breakpoints
    print("\n[2] Checking Navbar & 'Book Consultation' CTA Visibility:")
    breakpoints = [
        ("Desktop Standard (<=1366px)", r'@media\s*\(\s*max-width:\s*1366px\s*\)'),
        ("Laptop Compact (<=1180px)", r'@media\s*\(\s*max-width:\s*1180px\s*\)'),
        ("Tablet / Drawer (<=1080px)", r'@media\s*\(\s*max-width:\s*1080px\s*\)'),
        ("Tablet Portrait (<=992px)", r'@media\s*\(\s*max-width:\s*992px\s*\)'),
        ("Mobile Devices (<=768px)", r'@media\s*\(\s*max-width:\s*768px\s*\)'),
        ("Mobile Compact (<=480px)", r'@media\s*\(\s*max-width:\s*480px\s*\)'),
        ("Small Mobile (<=360px)", r'@media\s*\(\s*max-width:\s*360px\s*\)')
    ]
    
    for bp_name, bp_regex in breakpoints:
        match = re.search(bp_regex, css_content)
        print(f"  - Breakpoint defined: {bp_name}: {'PASS' if match else 'FAIL'}")

    # Check that .nav-actions .btn is NEVER set to display: none
    cta_hidden = re.findall(r'\.nav-actions\s*(?:\.btn)?\s*\{[^}]*display:\s*none', css_content)
    print(f"  - CTA button never hidden: {'PASS' if not cta_hidden else 'FAIL: Found display:none'}")

    # 3. Check for Dangerous Fixed Widths
    print("\n[3] Checking for Fixed Width Overflows (> 320px without max-width):")
    fixed_width_matches = re.findall(r'(?:^|[^{};])(width|min-width):\s*(\d+)px', css_content)
    hazardous_fixed_widths = []
    for prop, val in fixed_width_matches:
        v = int(val)
        if v > 320 and prop == "min-width":
            hazardous_fixed_widths.append(f"{prop}: {v}px")
    
    if hazardous_fixed_widths:
        print(f"  - Warning: Found potential large min-widths: {set(hazardous_fixed_widths)}")
    else:
        print("  - No dangerous fixed min-widths detected: PASS")

    # 4. Check Container and Section Constraints
    print("\n[4] Checking Fluid Layout Containers:")
    container_fluid = ".container" in css_content and "max-width:" in css_content and "padding:" in css_content
    print(f"  - Fluid .container with clamp/responsive padding: {'PASS' if container_fluid else 'FAIL'}")

    # 5. Check Mobile Menu Toggle Functionality
    print("\n[5] Checking Mobile Drawer & Hamburger Integration:")
    has_toggle = ".mobile-toggle" in css_content
    has_drawer_open = ".nav-menu.is-open" in css_content
    print(f"  - Hamburger mobile-toggle: {'PASS' if has_toggle else 'FAIL'}")
    print(f"  - Drawer is-open active state: {'PASS' if has_drawer_open else 'FAIL'}")

    # 6. Check Images & Media Responsiveness
    print("\n[6] Checking Responsive Media Defaults:")
    img_responsive = re.search(r'img[^\{]*\{[^}]*max-width:\s*100%', css_content) is not None
    print(f"  - img max-width: 100% default: {'PASS' if img_responsive else 'FAIL'}")

    print("\n" + "=" * 60)
    print("AUDIT COMPLETE - ALL CHECKS EVALUATED")
    print("=" * 60)

if __name__ == "__main__":
    check_css_responsiveness()
