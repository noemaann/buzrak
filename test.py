
import json
with open('fr.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
m = re.search(r'const imagePool\s*=\s*(\[.*?\]);', text, flags=re.DOTALL)
if m:
    val = m.group(1).replace('\n', '').replace('\r', '')
    print('Length of string:', len(val))
    # verify if it is valid json
    try:
        pool = json.loads(val)
        print('Parsed pool length:', len(pool))
    except Exception as e:
        print('Parse error:', e)

