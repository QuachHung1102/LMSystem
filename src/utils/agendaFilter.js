function agendaFilter(arrFilter, arrAgenda, key) {
  if (arrFilter.length === 0) {
    return arrAgenda;
  }
  const filteredAgenda = [];
  const dataTemp = [];
  arrAgenda.forEach(agenda => {
    agenda.data.forEach(item => {
      if (arrFilter.includes(item[key])) {
        dataTemp.push(item);
      }
    });
    filteredAgenda.push({title: agenda.title, data: dataTemp});
  });

  return filteredAgenda;
}

module.exports = {agendaFilter};
