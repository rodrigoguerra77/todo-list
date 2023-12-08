const formatDate = date => {
  if (date.length > 10) {
    const newDate = date.split('T');
    const [year, month, day] = newDate[0].split('-');
    return [month, day, year].join('/');
  }
  const [year, month, day] = date.split('-');
  return [month, day, year].join('/');
};
export default formatDate;
