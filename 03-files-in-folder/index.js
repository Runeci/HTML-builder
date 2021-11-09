const path = require('path');
const fs = require('fs');
const {stat} = require('fs');


fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, files) => {

  if (err)
    console.log(err);
  else {
    files.forEach(file => {
      const pathToFile = path.join(__dirname, `secret-folder/${file.name}`);
      if (file.isFile()) {
        stat(pathToFile, (err, stats) => {
          console.log(`${file.name.split('.')[0]} - ${path.extname(pathToFile).slice(1)} - ${Math.ceil(stats.size / 1024)}kb`);
        });
      }
    });
  }
});
