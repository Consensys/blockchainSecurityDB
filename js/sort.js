window.onload = () => {
  const table = document.querySelector('table');
  table.classList.add('sortable-theme-minimal');
  table.setAttribute('data-sortable', 'true');

  const auditData = document.querySelectorAll('tbody tr td:nth-of-type(2)');
  auditData.forEach(audit => {
    const text = audit.innerText;
    const years = text.match(/20../g);
    if(years && years.length > 0) {
      const sortedYears = years.sort();
      const highestYear = sortedYears[sortedYears.length - 1];
      audit.setAttribute('data-value', `${highestYear}`);
    }
  });

  const projectHeader = document.querySelector('thead th:nth-of-type(1)');
  projectHeader.setAttribute('data-sorted', 'true');
  projectHeader.setAttribute('data-sorted-direction', 'ascending');

  Sortable.init();
}