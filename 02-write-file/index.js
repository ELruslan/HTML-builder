const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


let writeableStream = fs.createWriteStream(__dirname + '/hello.txt');
process.stdout.write('Введите текст\n');
rl.on('line', (input) => {
  writeableStream.write(input + '\n');
  if(input ==='exit'){
    rl.close();
  }
  rl.on('close', () => {
    console.log('Buy!');
    process.exit(0);
  });
});