const fs = require('fs');
const path = require('path');
const styles = '06-build-page/assets/';


fs.mkdir('06-build-page/project-dist/',function (err){
  if (err) {
    console.error(err);}
});
fs.mkdir('06-build-page/project-dist/assets',function (err){
  if (err) {
    console.error(err);}
});
fs.readdir(styles, (err, files) => {
  files.forEach(file => {
    const testFolder=styles+`${file}`;
    fs.readdir(testFolder,(err,items)=>{
      items.forEach(item =>{
        fs.mkdir('06-build-page/project-dist/assets/'+`${file}`,function (){
          fs.createReadStream('06-build-page/assets/'+ `${file}` +'/'+ `${item}`).pipe(fs.createWriteStream('06-build-page/project-dist/assets/'+`${file}` +'/'+ `${item}`));
        });
      });
    });
  });
});

fs.readdir('06-build-page/styles/', (err, files) => {
  files.forEach(file => {
    if (path.extname(file) === '.css') {
      let readStream = fs.createReadStream('06-build-page/styles/' + file, 'utf-8');
      readStream.on('data', function (chunk) {
        fs.appendFile('06-build-page/project-dist/style.css', chunk.toString(), function (err) {
          if (err) {
            return console.log(err);
          }
        });
      });
    }
  });
});

fs.readdir('06-build-page/', (err, files) => {
  files.forEach(file => {
    if (path.extname(file) === '.html') {
      let readStream = fs.createReadStream('06-build-page/' + file, 'utf-8');
      readStream.on('data', function (chunk) {
        fs.appendFile('06-build-page/project-dist/index.html', chunk.toString(), function (err) {
          if (err) {
            return console.log(err);
          }
        });
      });
    }
  });
});

fs.readdir('06-build-page/components/', (err, files) => {
  console.log(files)
    if(files.length===3){
      let articles=fs.createReadStream('06-build-page/components/'+ files[0], 'utf-8');
      let footer=fs.createReadStream('06-build-page/components/'+ files[1], 'utf-8');
      let header=fs.createReadStream('06-build-page/components/'+ files[2], 'utf-8');
      
      header.on('data',function(header){
        
        articles.on('data',function(articles){
        
          footer.on('data',function(footer){
        
            fs.readFile('06-build-page/project-dist/index.html', 'utf8', function(error, data){
              data = data.toString().replace('{{header}}', header).replace('{{footer}}', footer).replace('{{articles}}', articles);
              fs.writeFile('06-build-page/project-dist/index.html',data,(err=>{
                if(err){
                  console.log(err);
                }
              }));
            });
          });
        });
      });
    }else if(files.length===4){
      let about=fs.createReadStream('06-build-page/components/'+ files[0], 'utf-8');
      let articles=fs.createReadStream('06-build-page/components/'+ files[1], 'utf-8');
      let footer=fs.createReadStream('06-build-page/components/'+ files[2], 'utf-8');
      let header=fs.createReadStream('06-build-page/components/'+ files[3], 'utf-8');
  header.on('data',function(header){
    
    articles.on('data',function(articles){
    
      footer.on('data',function(footer){

          about.on('data',function(about){
    
        fs.readFile('06-build-page/project-dist/index.html', 'utf8', function(error, data){
          data = data.toString().replace('{{header}}', header).replace('{{footer}}', footer).replace('{{articles}}', articles).replace('{{about}}', about);
          fs.writeFile('06-build-page/project-dist/index.html',data,(err=>{
            if(err){
              console.log(err);
            }
          }));
        });
      })
      });
    });
  });
}
});

  

