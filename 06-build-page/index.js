const path = require('path');
const fs = require('fs');

const dist = path.join(__dirname, 'project-dist');
const components = path.join(__dirname, 'components');


fs.mkdir(dist, {recursive: true}, err => {
  if (err) throw err;
});


fs.access(path.join(dist, 'style.css'), fs.constants.F_OK, (err) => {
  if (err) {
    console.error('Styles.css does not exist');
  } else {
    deleteBundle();
  }
});

function deleteBundle() {
  fs.unlink(path.join(dist, 'style.css'), function (err) {
    if (err) throw err;
  });
}

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    if (path.extname(path.join(__dirname, 'styles', `${file.name}`)) === '.css') {
      addStyleToBundle(file);
    }
  });
});

function addStyleToBundle(file) {
  fs.readFile(
    path.join(__dirname, 'styles', `${file.name}`),
    'utf-8',
    (err, data) => {
      if (err) throw err;

      fs.appendFile(
        path.join(dist, 'style.css'),
        `${data}`,
        (err) => {
          if (err) throw err;
        }
      );
    }
  );
}

/*Copy files*/

fs.mkdir(path.join(dist, 'assets'), {recursive: true}, err => {
  if (err) throw err;
});


fs.readdir(path.join(__dirname, 'assets'), {withFileTypes: true}, (err, folders) => {
  if (err) throw err;
  else {
    folders.forEach(folder => {
      copyDirectory(folder);
      fs.readdir(
        `${path.join(__dirname, 'assets', `${folder.name}`)}`,
        {withFileTypes: true},
        (err, files) => {
          if (err) throw err;
          else {
            files.forEach(file => {
              fs.copyFile(
                `${path.join(__dirname, 'assets', `${folder.name}`, `${file.name}`)}`,
                `${path.join(dist, 'assets', `${folder.name}`, `${file.name}`)}`,
                (err) => {
                  if (err) throw err;
                });
            });
          }
        });
    });
  }
});

function copyDirectory(directory) {
  fs.mkdir(path.join(dist, 'assets', `${directory.name}`), {recursive: true}, err => {
    if (err) throw err;
  });
}




fs.readFile( path.join(__dirname, 'template.html'), 'utf-8', (err, templateData) => {
  if(err) throw err;
  fs.writeFile(path.join(dist, 'index.html'), templateData, 'utf-8', (err) => {
    if(err) throw err;
  });
  fs.readFile(path.join(dist, 'index.html'), 'utf-8', (err, dataHtmlCopy) => {
    if(err) throw err;

    fs.readdir(components, (err, componentsFiles) => {
      if(err) throw err;
      componentsFiles.forEach(component => {
        let componentWay = path.join(components, component);
        let componentName = component.split('.')[0];
        fs.readFile(componentWay, 'utf-8', (err, htmlData) => {
          if(err) throw err;
          dataHtmlCopy = dataHtmlCopy.replace(new RegExp(`{{${componentName}}}`, 'g'), htmlData);
          fs.writeFile(path.join(dist, 'index.html'), dataHtmlCopy, 'utf-8', (err) => {
            if(err) throw err;
          });
        });
      });
    });
  });
});