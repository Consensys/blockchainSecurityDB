const projects = require('./projects.json');
const path = require('path');
const fs = require('fs');

function separateJsonProjects(indexes) {
  let projectsArr = [];
  indexes.forEach(index => {
    projectsArr.push(projects[index]);
  });

  let newProject = {};
  newProject.audits = []

  projectsArr.forEach((project, index) => {
    project["Project"] ? newProject.project = project["Project"] : null;
    project["Project URL"] ? newProject.project_url = project["Project URL"] : null;
    project["Description"] ? newProject.description = project["Description"] : null;
    if(project["Audit Title"]) {
      newProject.audits[index] = {};
      newProject.audits[index].repos = [];
      newProject.audits[index].title = project["Audit Title"];
    }
    project["Date of Audit"] ? newProject.audits[index].date = project["Date of Audit"] : null;
    project["Auditor"] ? newProject.audits[index].auditor = project["Auditor"] : null;
    project["Audit URL"] ? newProject.audits[index].url = project["Audit URL"] : null;
    if(project["Repo"]) {
      if(project["Audit Title"]) {
        newProject.audits[index].repos.push(Object.assign({url: project["Repo"]}));
      } else {
        let lastIndex;
        let j = index - 1;
        while(true) {
          if(projectsArr[j]["Audit Title"] !== undefined) {
            lastIndex = j;
            break;
          }
          j--;
        }
        newProject.audits[lastIndex].repos.push(Object.assign({url: project["Repo"]}));
      }
    }
    project["Person-Weeks Effort"] ? newProject.effort = project["Person-Weeks Effort"] : null;
    project["Bounty URL"] ? newProject.bounty = project["Bounty URL"] : null;
    project["Bounty Max Payout"] ? newProject.bounty_max = project["Bounty Max Payout"] : null;
    project["Security Contact Email"] ? newProject.security_contact = project["Security Contact Email"] : null;
  });

  const fileName = newProject.project.split(' ').join('-');
  const newFileName = fileName.split('.').join('-').toLowerCase();
  const jsonProject = JSON.stringify(newProject);
  const writePath = path.join(__dirname, '../projects');
  fs.writeFile(`${writePath}/${newFileName}.json`, jsonProject, (err) => {
    if(err) throw err;
    console.log('File successfully created.');
  })
}

separateJsonProjects([0,1]);