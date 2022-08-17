export const formatDate = (unix_timestamp: any) => {
  var date = new Date(unix_timestamp * 1000);
  return date;
};
