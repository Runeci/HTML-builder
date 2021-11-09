const path = require('path');
const fs = require('fs');



fs.mkdir(path.join(__dirname, 'files-copy'),{recursive: true}, err => {
  if (err) throw err;
});


fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true}, (err, files) => {

  if (err)
    console.log(err);
  else {
    files.forEach(file => {
      fs.readFile(
        path.join(__dirname, 'files', `${file.name}`),
        'utf-8',
        (err, data) => {
          if (err) throw err;
          fs.writeFile(
            path.join(__dirname, 'files-copy', `${file.name}`),
            `${data}`,
            (err) => {
              if (err) throw err;
            }
          );
        }

      );
    });
  }
});
