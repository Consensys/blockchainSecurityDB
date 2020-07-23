window.onload = () => {
  const table = document.querySelector('table');
  table.classList.add('sortable-theme-minimal');
  table.setAttribute('data-sortable', 'true');

  const auditData = document.querySelectorAll('tbody tr td:nth-of-type(2)');
  auditData.forEach(audit => {
    const text = audit.innerText;
    const months =  text.match(/[a-zA-Z]..\.+/g);
    let monthNum = [];
    if(months) {
      months.forEach(month => {
        month === 'Jan.' ? monthNum.push(0) : null;
        month === 'Feb.' ? monthNum.push(1) : null;
        month === 'Mar.' ? monthNum.push(2) : null;
        month === 'Apr.' ? monthNum.push(3) : null;
        month === 'May.' ? monthNum.push(4) : null;
        month === 'Jun.' ? monthNum.push(5) : null;
        month === 'Jul.' ? monthNum.push(6) : null;
        month === 'Aug.' ? monthNum.push(7) : null;
        month === 'Sep.' ? monthNum.push(8) : null;
        month === 'Oct.' ? monthNum.push(9) : null;
        month === 'Nov.' ? monthNum.push(10) : null;
        month === 'Dec.' ? monthNum.push(11) : null;
      })
    }
    const years = text.match(/20\d\d/g);
    let dates = [];
    if(years) {
      for(let i = 0; i < years.length; i++) {
        dates.push([years[i], monthNum[i]]);
      }
    }
    let dateObjs = []
    dates.forEach(date => {
      if(date) {
        dateObjs.push(new Date(date[0], date[1], 1));
      }
    });
    const sortedDates = dateObjs.sort((a,b) => {
      return a - b;
    });
    const highestDate = sortedDates[sortedDates.length - 1];
    audit.setAttribute('data-value', `${highestDate}`);
  });

  const projectHeader = document.querySelector('thead th:nth-of-type(1)');
  projectHeader.setAttribute('data-sorted', 'true');
  projectHeader.setAttribute('data-sorted-direction', 'ascending');

  Sortable.init();
}