const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

module.exports = function dateHelper(dateString) {
    const d = new Date(dateString);
    return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
};
