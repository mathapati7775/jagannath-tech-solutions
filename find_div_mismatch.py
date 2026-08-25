with open("index.html", "r", encoding="utf-8") as f:
    lines = f.readlines()

stack = []
for i, line in enumerate(lines):
    line_num = i + 1
    # Find all <div> and </div> in this line
    import re
    tokens = re.findall(r'(<div\b|</div>)', line)
    for t in tokens:
        if t.startswith('<div'):
            stack.append((line_num, line.strip()[:40]))
        elif t == '</div>':
            if not stack:
                print(f"Extra </div> at line {line_num}: {line.strip()}")
            else:
                stack.pop()

if stack:
    print(f"Unclosed <div> tags remaining: {len(stack)}")
    for l, s in stack[-5:]:
        print(f"  Line {l}: {s}")
