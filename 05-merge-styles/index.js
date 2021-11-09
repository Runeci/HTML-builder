const path = require('path');
const fs = require('fs');



fs.access(path.join(__dirname, 'project-dist', 'bundle.css'), fs.constants.F_OK, (err) => {
  if (err) {
    console.error('Bundle does not exist');
  } else {
    deleteBundle();
  }
});


function deleteBundle() {
  fs.unlink(path.join(__dirname, 'project-dist', 'bundle.css'), function (err) {
    if (err) {
      console.log(err);
    }
  });
}


fs.mkdir(path.join(__dirname, 'project-dist'),{recursive: true}, err => {
  if (err) throw err;
});


fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
      if (path.extname(path.join(__dirname, 'styles', `${file.name}`)) === '.css') {
        addStyleToBundle(file);
      }
    });
  }
});

function addStyleToBundle (file) {
  fs.readFile(
    path.join(__dirname, 'styles', `${file.name}`),
    'utf-8',
    (err, data) => {
      if (err) throw err;

      fs.appendFile(
        path.join(__dirname, 'project-dist', 'bundle.css'),
        `${data}`,
        (err) => {
          if (err) throw err;
        }
      );
    }
  );
}

