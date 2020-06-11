### Setup

* `pip install mkdocs`
* `mkdocs serve`
* Visit `localhost:8000`

### Add or Update a Project

* In the `/projects` directory, create a JSON file named after your project.
  * Note: Check to see if your project already exists before creating a new one.

* Using the following template, fill in project data.

```
{
  "project": "Project Name",
  "project_url": "Project URL",
  "description": "Description of your project",
  "bounty": "Bounty program URL",
  "bounty_max": "Max bounty payout",
  "security_contact": "Security contact email",
  "audits": [
    {
      "repos": [
        {
          "url": "URL of the repo pertaining to audit"
        }
      ],
      "title": "Audit title",
      "date": "mm/yy",
      "auditor": "Name of auditor",
      "url": "Audit URL",
      "effort": "Person-weeks effort of audit"
    }
  ]
}
```

* Run `npm run build`