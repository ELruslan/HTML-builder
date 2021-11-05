const fs = require('fs');
const path = require('path');
const testFolder = '03-files-in-folder/secret-folder/';


fs.readdir(testFolder, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    fs.stat(testFolder+file,(err,stats)=>{
      if(stats.isFile()===true){
        console.log(path.parse(file).name + ' - ' + path.extname(file)+ ' - ' +stats.size +'b');
      }
    });
  });
});
   
  