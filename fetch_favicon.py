import urllib.request
import re

url = 'https://lingo.dev'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')

# Find favicon
match = re.search(r'<link[^>]*rel=[\'"](?:shortcut )?icon[\'"][^>]*href=[\'"]([^\'"]+)[\'"]', html, re.IGNORECASE)
if not match:
    match = re.search(r'<link[^>]*href=[\'"]([^\'"]+)[\'"][^>]*rel=[\'"](?:shortcut )?icon[\'"]', html, re.IGNORECASE)

if match:
    favicon_url = match.group(1)
    if favicon_url.startswith('//'):
        favicon_url = 'https:' + favicon_url
    elif favicon_url.startswith('/'):
        favicon_url = url + favicon_url
    elif not favicon_url.startswith('http'):
        favicon_url = url + '/' + favicon_url
        
    print('Favicon URL:', favicon_url)
    
    # Download
    req_img = urllib.request.Request(favicon_url, headers={'User-Agent': 'Mozilla/5.0'})
    img_data = urllib.request.urlopen(req_img).read()
    
    with open('C:\\Canvas-with-C1\\canvas-with-c1\\src\\app\\favicon.ico', 'wb') as f:
        f.write(img_data)
        
    print('Downloaded and saved to favicon.ico')
else:
    print('Favicon not found')
