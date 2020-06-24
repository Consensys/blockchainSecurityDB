const path = require('path');
const fs = require('fs');

function testJsonFiles() {
  const projectsPath = path.join(__dirname, '../projects');
  fs.readdir(projectsPath, (err, files) => {
    files.forEach(file => {
      fs.readFile(`${projectsPath}/${file}`, (err, json) => {
        if(err) throw err;
        const project = JSON.parse(json)
        
        if(!project.project) {
          throw `${file} is missing a project property`;
        }
        if(!project.project_url) {
          throw `${file} is missing a project_url property`;
        }
        if(!project.description) {
          throw `${file} is missing a description property`;
        }

        if(project.audits) {
          project.audits.forEach((audit, i) => {
            if(!audit.url) {
              throw `${file} is missing an audit[${i}].url property`;
            }
            if(!audit.title) {
              throw `${file} is missing an audit[${i}].title property`;
            }
            if(!audit.auditor) {
              throw `${file} is missing an audit[${i}].auditor property`;
            }
          });
        }
      });
    })
  });
}

testJsonFiles();