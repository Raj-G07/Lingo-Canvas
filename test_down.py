import urllib.request

req = urllib.request.Request('https://lingo.dev/favicon.ico', headers={'User-Agent': 'Mozilla/5.0'})
try:
    response = urllib.request.urlopen(req)
    print("Status:", response.status)
    data = response.read()
    print("Got data:", len(data))
    with open('C:\\Canvas-with-C1\\canvas-with-c1\\src\\app\\temp_favicon.ico', 'wb') as f:
        f.write(data)
except Exception as e:
    print("Error:", e)
