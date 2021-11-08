const fs = require('fs');
const path = require('path');
const styles = '05-merge-styles/styles/';

fs.readdir('05-merge-styles/project-dist',(err,files)=>{
  files.forEach(file=>{
    fs.stat('05-merge-styles/project-dist/bundle.css',(err,stats)=>{
      if(path.extname(file) === 'bundle.css'){
        fs.unlink('05-merge-styles/project-dist/bundle.css',()=>{
        })
      }else{
        fs.readdir(styles, (err, files) => {
          files.forEach(file => {
            if (path.extname(file) === '.css') {
              let readStream = fs.createReadStream(styles + file, 'utf-8');
              readStream.on('data', function (chunk) {
                fs.appendFile('05-merge-styles/project-dist/bundle.css', chunk.toString(), function (err) {
                  if (err) {
                    return console.log(err);
                  }
                  console.log(chunk);
                });
              });
            }
          });
        });
      }
    })
  })
})
