import dateFormat from "dateformat";
// Date Converter
export const epochToMilliSecondsConverter = (apiData: number) => {
  return new Date(apiData * 1000);
};

export const timeZoneConverter = (apiData: number, timezone: number) => {
  return apiData + timezone;
};
export const utcConverter = (apiData: Date | string) => {
  return dateFormat(apiData, "h:MM TT", true);
};


