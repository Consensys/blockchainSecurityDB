const path = require('path');
const fs = require('fs');

function jsonProjectToMd(file) {
  const jsonFile = require(`../projects/${file}`);

  // Months map
  const monthsMap = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December',
    '1': 'January',
    '2': 'February',
    '3': 'March',
    '4': 'April',
    '5': 'May',
    '6': 'June',
    '7': 'July',
    '8': 'August',
    '9': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  }

  let auditMdArr = [];
  
  for(i = 0; i < jsonFile.audits.length; i++) {
    const audit = jsonFile.audits[i];
    // Format date
    let auditDate;
    if(audit.date.length > 0) {
      const month = monthsMap[audit.date.split('/')[0]];
      const year = `20${audit.date.split('/')[1]}`;
      auditDate = `${month}, ${year}`;
    }

    // Get audit repos
    let auditRepos = '';
    audit.repos.forEach(repo => {
      auditRepos += `[Repo](${repo.url})`;
    });

    auditMdArr[i] = 
      `
#### [${audit.title}](${audit.url})

${auditDate}<br>
Audited by: ${audit.auditor}<br>${audit.effort ? `Effort: ${audit.effort}<br>` : ''}
${auditRepos ? auditRepos : ''}
      `
  }

  const auditMd = `
## Audits

${Array(auditMdArr.length).join(0).split(0).map((item, i) => `
${auditMdArr[i] !== undefined ? auditMdArr[i] : ''}
`).join('')}
  `

  const fullMd = 
  `
# ${jsonFile.project}
  
[${jsonFile.project_url}](${jsonFile.project_url})<br>
${jsonFile.description}

${auditMd}

${jsonFile.bounty ? 
`## Bounty

[${jsonFile.bounty}](${jsonFile.bounty})<br>
${jsonFile.bounty_max ? `Max payout: ${jsonFile.bounty_max}` : ''}
` : ''}

${jsonFile.security_contact ? 
`## Additional Info

Security Contact: ${jsonFile.security_contact}
` : ''}`

  const fileName = file.split('.')[0];
  const writePath = path.join(__dirname, '../docs/projects');
  fs.writeFile(`${writePath}/${fileName}.md`, fullMd, (err) => {
    if(err) throw err;
    console.log('File successfully created.');
  });
}

const projectsPath = path.join(__dirname, '../projects');
fs.readdir(projectsPath, (err, files) => {
  files.forEach(file => {
    jsonProjectToMd(file);
  })
});