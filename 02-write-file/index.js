const readline = require('readline');
const process = require('process');
const path = require('path');
const fs = require('fs');



const {stdin: input, stdout: output} = require('process');
const rl = readline.createInterface({input, output});

console.log('Enter data ');

rl.on('line', (message) => {
  writeToFile(message);
});

function writeToFile(message) {
  if (message === 'exit') {
    console.log('Goodbye');
    process.exit();
  }
  fs.appendFile(path.join(__dirname, 'text.txt'),
    `${message} \n`, (err) => {
      if (err) {
        throw err;
      }
    });
}

process.on('beforeExit', () => console.log('Goodbye'))