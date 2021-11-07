var fs = require('fs');



 

fs.stat('04-copy-directory/files-copy', function(err) {
  if (!err) {
      fs.readdir('04-copy-directory/files-copy',function(err,files){
        if (err)
        console.log(err);
        files.forEach(file=>{
          fs.unlink('04-copy-directory/files-copy/'+`${file}`,function(err){
            if(err) return console.log(err);
          });
          
      })
      fs.rmdir('04-copy-directory/files-copy',function(err){
        if (err) {
          return console.error(err);
      }
      })
  })
}  else if (err.code === 'ENOENT') {
    fs.mkdir('04-copy-directory/files-copy/',function (err){
      if (err) {
        console.error(err);} 
        fs.readdir('04-copy-directory/files-copy/',function(err){
          if (err)
          console.log(err);
          const testFolder = '04-copy-directory/files/';
          fs.readdir(testFolder, (err, files) => {
            if (err)
            console.log(err);
            files.forEach(file => {
              fs.createReadStream('04-copy-directory/files/'+`${file}`).pipe(fs.createWriteStream('04-copy-directory/files-copy/'+`${file}`));
            });
          });
        })
  });
     
  }
});








