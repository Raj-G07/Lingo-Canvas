import urllib.request
try:
    req = urllib.request.Request('https://lingo.dev/favicon.ico', headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    data = response.read()
    with open('C:\\Canvas-with-C1\\canvas-with-c1\\src\\app\\temp_favicon.ico', 'wb') as f:
        f.write(data)
    with open('C:\\Canvas-with-C1\\canvas-with-c1\\download_result.txt', 'w') as f:
        f.write('SUCCESS ' + str(len(data)))
except Exception as e:
    with open('C:\\Canvas-with-C1\\canvas-with-c1\\download_result.txt', 'w') as f:
        f.write('ERROR ' + str(e))
