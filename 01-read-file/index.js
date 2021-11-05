const fs=require('fs');
const path='/text.txt';

let readStream=fs.createReadStream(__dirname +path, 'utf-8');

readStream.on('data',function(chunk){
  console.log(chunk);
});