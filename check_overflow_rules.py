import re

with open("style.css", "r", encoding="utf-8") as f:
    css = f.read()

# Find all blocks with overflow or marquee or carousel or track
matches = re.findall(r'(\.[a-zA-Z0-9_-]+(?:-[a-zA-Z0-9_-]+)*)\s*\{([^}]+)\}', css)

print(f"Total CSS rule blocks: {len(matches)}")
overflow_blocks = []
for sel, body in matches:
    if "marquee" in sel or "carousel" in sel or "slider" in sel or "rail" in sel or "viewport" in sel:
        has_overflow = "overflow" in body
        print(f"Selector: {sel}")
        for line in body.strip().split(";"):
            if "overflow" in line or "width" in line or "max-width" in line:
                print(f"  {line.strip()}")
