const http =require('node:https');
const fs = require('fs');
function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
/**
 * @params {string} url - url
 * @params {string} downloadPath - Where you want put
 *  * @params {string} onDownload - Return Path Value
 */
const f = {};
f.download = async (url, downloadPath, onDownloaded) => {
  const id = makeid(100);
  const file = fs.createWriteStream(`${downloadPath}/${id}.mp3`);
  try {
    http.get(url, function(response) {
      response.pipe(file);

      // after download completed close filestream
      file.on('finish', () => {
        file.close();
        console.log('Download Completed');
        onDownloaded(`${downloadPath}/${id}.mp3`);
      });
      file.on('error', () => {
        onDownloaded('./audio/failed.mp3');
      });
    }).on('error', () => {
      file.close();
    });
  } catch {
    console.log('Error');
  }
};
module.exports = f;
