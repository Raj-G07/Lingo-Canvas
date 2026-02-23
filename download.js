const https = require('https');
const fs = require('fs');

https.get('https://lingo.dev/favicon.ico', (res) => {
  const fileStream = fs.createWriteStream('C:\\Canvas-with-C1\\canvas-with-c1\\src\\app\\temp_favicon.ico');
  res.pipe(fileStream);
  fileStream.on('finish', () => {
    fileStream.close();
    console.log('Download complete');
    
    // verify file size
    const stats = fs.statSync('C:\\Canvas-with-C1\\canvas-with-c1\\src\\app\\temp_favicon.ico');
    if (stats.size > 0 && stats.size < 500000) {
      fs.copyFileSync('C:\\Canvas-with-C1\\canvas-with-c1\\src\\app\\temp_favicon.ico', 'C:\\Canvas-with-C1\\canvas-with-c1\\src\\app\\favicon.ico');
      console.log('Successfully replaced favicon.ico');
    } else {
      console.log('Downloaded file is invalid size:', stats.size);
    }
  });
}).on('error', (err) => {
  console.log('Error: ', err.message);
});
