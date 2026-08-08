#!/usr/bin/env python3
"""download-search-images.py — Search and download real photos for industries + avatars."""
import json
import subprocess
import os
import urllib.request

QUERIES = [
    ("industries/restaurant", "modern Indian restaurant interior fine dining"),
    ("industries/hotel", "luxury hotel lobby interior elegant"),
    ("industries/warehouse", "modern warehouse logistics storage interior"),
    ("industries/healthcare", "modern hospital healthcare facility interior"),
    ("industries/manufacturing", "modern factory manufacturing facility clean"),
    ("industries/retail", "modern retail store shopping mall interior"),
    ("avatars/customer-1", "happy Indian man portrait professional headshot smiling"),
    ("avatars/customer-2", "happy Indian woman portrait professional headshot smiling"),
    ("avatars/customer-3", "Indian businessman portrait professional headshot"),
    ("avatars/customer-4", "Indian businesswoman portrait professional headshot"),
    ("avatars/customer-5", "Indian family portrait happy home"),
    ("avatars/customer-6", "Indian senior man portrait friendly"),
]

BASE = "/home/z/my-project/public/images"

for path_suffix, query in QUERIES:
    out_dir = os.path.join(BASE, os.path.dirname(path_suffix))
    os.makedirs(out_dir, exist_ok=True)
    name = os.path.basename(path_suffix)
    out_file = os.path.join(out_dir, f"{name}.jpg")
    if os.path.exists(out_file) and os.path.getsize(out_file) > 5000:
        print(f"SKIP {out_file}")
        continue
    print(f"SEARCH: {query}")
    try:
        result = subprocess.run(
            ["z-ai", "image-search", "-q", query, "--count", "3", "--gl", "us", "--no-rank", "--json"],
            capture_output=True, text=True, timeout=180
        )
        # Parse JSON from stdout — skip the emoji-prefixed lines
        output = result.stdout
        # Find the JSON object in the output
        json_start = output.find('{')
        if json_start == -1:
            print(f"  No JSON in output for {query}")
            continue
        json_str = output[json_start:]
        data = json.loads(json_str)
        results = data.get('results', [])
        if not results:
            print(f"  No results for {query}")
            continue
        url = results[0].get('original_url', '')
        if not url:
            print(f"  No URL for {query}")
            continue
        print(f"  Downloading: {url[:80]}...")
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=30) as resp:
            img_data = resp.read()
        with open(out_file, 'wb') as f:
            f.write(img_data)
        print(f"  Saved {out_file} ({len(img_data)} bytes)")
    except Exception as e:
        print(f"  ERROR: {e}")

print("\n=== Final listing ===")
for root, dirs, files in os.walk(BASE):
    for f in files:
        fp = os.path.join(root, f)
        print(f"  {fp}  ({os.path.getsize(fp)} bytes)")
