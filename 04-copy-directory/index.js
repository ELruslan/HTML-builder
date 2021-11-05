var fs = require('fs');

fs.mkdir('04-copy-directory/files-copy',function (err){
  if (err) {
    console.error(err);}
});
const testFolder = '04-copy-directory/files/';
fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    fs.createReadStream('04-copy-directory/files/'+`${file}`).pipe(fs.createWriteStream('04-copy-directory/files-copy/'+`${file}`));
    console.log(file);
  });
});

