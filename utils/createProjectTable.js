const path = require('path');
const fs = require('fs');

function createProjectTableRow(file) {
  const jsonFile = require(`../projects/${file}`);
  const fileName = file.split('.')[0];

  // Months map
  const monthsMap = {
    '01': 'Jan.',
    '02': 'Feb.',
    '03': 'Mar.',
    '04': 'Apr.',
    '05': 'May.',
    '06': 'Jun.',
    '07': 'Jul.',
    '08': 'Aug.',
    '09': 'Sep.',
    '10': 'Oct.',
    '11': 'Nov.',
    '12': 'Dec.',
    '1': 'Jan.',
    '2': 'Feb.',
    '3': 'Mar.',
    '4': 'Apr.',
    '5': 'May.',
    '6': 'Jun.',
    '7': 'Jul.',
    '8': 'Aug.',
    '9': 'Sep.',
    '10': 'Oct.',
    '11': 'Nov.',
    '12': 'Dec.'
  }

  // Get individual audits
  let auditMdArr = [];
  for(i = 0; i < jsonFile.audits.length; i++) {
    const audit = jsonFile.audits[i];
    // Format date
    let auditDate;
    if(audit.date && audit.date.length > 0) {
      const month = monthsMap[audit.date.split('/')[0]];
      const year = `20${audit.date.split('/')[1]}`;
      auditDate = `${month} ${year}`;
    }

    auditMdArr[i] = `
<li>[${audit.title} (${audit.auditor}, ${auditDate})](${audit.url})</li>
    `
  }

  // Join audits
  const auditMd = `
<ul>
${Array(auditMdArr.length).join(0).split(0).map((item, i) => `
${auditMdArr[i] !== undefined ? auditMdArr[i] : ''}
`).join('')}
</ul>
  `

  const tableRowMd = `
|[${jsonFile.project}](projects/${fileName}.md)<br>${jsonFile.description}|${auditMd}|${jsonFile.bounty && jsonFile.bounty_max ? `[${jsonFile.bounty_max}](${jsonFile.bounty})` : ''}|
  `
  
  const formattedtableRowMd = tableRowMd.split('\n').join('');

  const writePath = path.join(__dirname, '../docs');

  fs.appendFileSync(`${writePath}/index.md`, `\n${formattedtableRowMd}`, (err) => {
    if(err) throw err;
    console.log('Table row successfully appended.');
  });
}

function createProjectTable() {
  const tableStarterMd = 
`# Blockchain Security Database

The Blockchain Security Database is an open-source database created by [ConsenSys Diligence](https://diligence.consensys.net/) 
to act as a repository of security information organized by projects. The database contains a catalog of blockchain projects 
with details pertaining to their security including audits, bounties, and security contacts. Click on the name of the project 
in the project column to see more details about a project. To add or update a project, 
see [this guide](https://github.com/ConsenSys/blockchainSecurityDB#add-or-update-a-project).

The objective is only to present the information we could find, not to evaluate or interpret it. In order to enable other 
projects to take advantage of this resource, all the data for a given projects is stored in a [JSON file](https://github.com/ConsenSys/blockchainSecurityDB/blob/master/projects) 
making it easily machine-readable.

**This project simply serves as an aggregation of blockchain security data, and does not guarantee the security of any particular project.**

|Project|Audits|Max Bounty Payout|
|-------|------|-----------------|`

  const writePath = path.join(__dirname, '../docs');

  fs.writeFile(`${writePath}/index.md`, tableStarterMd, err => {
    if(err) throw err;
    console.log('Table starter successfully created.');
  });

  const projectsPath = path.join(__dirname, '../projects');
  fs.readdir(projectsPath, (err, files) => {
    files.forEach(file => {
      createProjectTableRow(file);
    })
  });
}

createProjectTable();