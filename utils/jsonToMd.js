const projects = require('./projects.json');

function convertJsonToMd(indexes) {
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

  // Final value variables
  let title;
  let projectURL;
  let description;
  let audits = [];
  audits.auditTitles = [];
  audits.auditURLs = [];
  audits.auditDates = [];
  audits.auditors = [];
  audits.efforts = [];
  audits.repos = [];
  audits.commitHashes = [];
  let bountyURL;
  let bountyMax;
  let securityContact;

  // Intermediary array variables
  let titleArr = [];
  let projectURLArr = [];
  let descriptionArr = [];
  let auditTitlesArr = [];
  let auditURLsArr = [];
  let auditDatesArr = [];
  let auditorsArr = [];
  let effortsArr = [];
  let reposArr = [];
  let commitHashesArr = [];
  let bountyURLArr = [];
  let bountyMaxArr = [];
  let securityContactArr = [];

  // Get intermediary array values
  indexes.some((index, i) => {
    if(projects[index]["Listed"] !== false) {
      titleArr[i] = projects[index]["Project"];
      projectURLArr[i] = projects[index]["Project URL"];
      descriptionArr[i] = projects[index]["Description"];
      auditTitlesArr[i] = projects[index]["Audit Title"];
      auditURLsArr[i] = projects[index]["Audit URL"];
      auditDatesArr[i] = projects[index]["Date of Audit"];
      auditorsArr[i] = projects[index]["Auditor"];
      effortsArr[i] = projects[index]["Person-Weeks Effort"];
      reposArr[i] = projects[index]["Repo"];
      commitHashesArr[i] = projects[index]["Commit Hash"];
      bountyURLArr[i] = projects[index]["Bounty URL"];
      bountyMaxArr[i] = projects[index]["Bounty Max Payout"];
      securityContactArr[i] = projects[index]["Security Contact Email"];
    }
  });

  // Get final values
  for(i = 0; i < indexes.length; i++) {
    titleArr[i] ? title = titleArr[i] : null;
    projectURLArr[i] ? projectURL = projectURLArr[i] : null;
    descriptionArr[i] ? description = descriptionArr[i] : null;
    auditTitlesArr[i] ? audits.auditTitles.push(auditTitlesArr[i]) : audits.auditTitles.push(false);
    auditURLsArr[i] ? audits.auditURLs.push(auditURLsArr[i]) : audits.auditURLs.push(false);
    // Format dates
    if(auditDatesArr[i]) {
      const date = auditDatesArr[i];
      const month = monthsMap[date.split('/')[0]];
      const year = `20${date.split('/')[1]}`;
      const dateString = `${month}, ${year}`;
      audits.auditDates.push(dateString);
    } else {
      audits.auditDates.push(false)
    }
    auditorsArr[i] ? audits.auditors.push(auditorsArr[i]) : audits.auditors.push(false);
    effortsArr[i] ? audits.efforts.push(effortsArr[i]) : audits.efforts.push(false);
    reposArr[i] ? audits.repos.push(reposArr[i]) : audits.repos.push(false);
    commitHashesArr[i] ? audits.commitHashes.push(commitHashesArr[i]) : audits.commitHashes.push(false);
    bountyURLArr[i] ? bountyURL = bountyURLArr[i] : null;
    bountyMaxArr[i] ? bountyMax = bountyMaxArr[i] : null;
    securityContactArr[i] ? securityContact = securityContactArr[i] : null;
  }

  let auditMdArr = [];

  // Loop through indexes
  for(i = 0; i < indexes.length; i++) {
    if(audits.auditTitles[i]) {
      auditMdArr[i] = 
      `#### [${audits.auditTitles[i]}](${audits.auditURLs[i]})

        ${audits.auditDates[i]}<br>
        Audited by: ${audits.auditors[i]}<br>
        ${audits.efforts[i] ? `Effort: ${audits.efforts[i]}<br>` : ''}
        ${audits.repos[i] ? `[Repo](${audits.repos[i]})` : ''}
      `
    } else if(audits.repos[i]) {
      auditMdArr[i-1] = auditMdArr[i-1].concat(
      `<br>
      ${audits.repos[i] ? `[Repo](${audits.repos[i]})` : ''}
      `)
    }
  }

  const auditMd = `
    ## Audits

    ${Array(auditMdArr.length).join(0).split(0).map((item, i) => `
      ${auditMdArr[i] !== undefined ? auditMdArr[i] : ''}
    `).join('')}
  `

  const fullMd = `
    # ${title}

    [${projectURL}](${projectURL})<br>
    ${description}

    ${auditMd}

    ${bountyURL ? 
    `## Bounty
    
    [${bountyURL}](${bountyURL})<br>
    Max payout: ${bountyMax}
    ` : ''}
    
    ${securityContact ? 
    `## Additional Info
    Security Contact: ${securityContact}
    ` : ''}
  `

  console.log(fullMd);
}

convertJsonToMd([20, 21, 22]);