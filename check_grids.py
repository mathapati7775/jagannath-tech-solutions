import re

with open("style.css", "r", encoding="utf-8") as f:
    css = f.read()

# Find all grid-template-columns rules
grids = re.findall(r'([^{}]+)\s*\{[^}]*grid-template-columns:\s*([^;]+);', css)

print("Found", len(grids), "grid-template-columns definitions:")
for sel, val in grids:
    sel = sel.strip().replace("\n", " ")
    val = val.strip()
    print(f"Selector: {sel}\n  Columns: {val}\n")
