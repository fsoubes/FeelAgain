const getMinutesBetweenDates = (startDate: any, endDate: any) => {
  const diff = endDate.getTime() - startDate.getTime();
  return diff / 60000;
};
const parseISOString = (s: any) => {
  const b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], b[1] - 1, b[2], b[3], b[4], b[5], b[6]));
};

export const getIntervalBetweenDates = (startDate: any, endDate: any) => {
  const time = getMinutesBetweenDates(parseISOString(endDate), startDate);
  if (time < 1) {
    return "1 minute ago";
  } else if (time > 1 && time < 60) {
    return `${Math.floor(time)} minutes ago`;
  } else if (time > 60 && time < 1440) {
    return `${Math.floor(time / 60)} hours ago`;
  } else if (time > 1440 && time < 43800) {
    return `${Math.floor(time / 1440)} day ago`;
  } else if (time > 43800 && time < 525600) {
    return `${Math.floor(time / 43800)} month ago`;
  } else {
    return `${Math.floor(time / 525600)} year ago`;
  }
};
