const timeToLocalFormat = (inputTime) => {
  const inputTimeVal = new Date(inputTime).getTime();
  // eslint-disable-next-line no-restricted-globals
  if (!inputTime || isNaN(inputTimeVal)) {
    return '';
  }
  let localTime = '';
  const offset = (new Date()).getTimezoneOffset();
  localTime = (new Date(inputTimeVal - offset * 60000)).toISOString();
  localTime = localTime.substr(0, localTime.lastIndexOf('.'));
  localTime = localTime.replace('T', ' ');
  return localTime;
}
export default timeToLocalFormat
