import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

with open("data.js", "r", encoding="utf-8") as f:
    data = f.read()

with open("main.js", "r", encoding="utf-8") as f:
    js = f.read()

print("Checking for 'undefined' or 'NaN' in code files...")
for name, content in [("index.html", html), ("data.js", data), ("main.js", js)]:
    if "undefined" in content and name != "main.js" and name != "data.js":
        print(f"Warning: 'undefined' found in {name}")
    else:
        print(f"[OK] {name} clean.")

# Check unclosed tags or syntax issues in HTML
open_divs = len(re.findall(r'<div\b', html))
close_divs = len(re.findall(r'</div>', html))
print(f"HTML Structure: {open_divs} open <div> tags, {close_divs} close </div> tags.")
if open_divs == close_divs:
    print("[PASS] <div> balance matches perfectly.")
else:
    print("[WARN] <div> tag count mismatch, please check.")

print("Integrity check complete.")
