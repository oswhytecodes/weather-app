
// const { timezone, dt } = useAppSelector((state) => state.weather.data);
// const { sunrise, sunset } = useAppSelector((state) => state.weather.data.sys);

// // timezone
// const timezoneCalculation = timeZoneConverter(dt, timezone);
// // convert sunrise time
// let sunriseUnixTime = timeZoneConverter(sunrise, timezone);
// // convert sunset time
// let sunsetUnixTime = timeZoneConverter(sunset, timezone);
// // change bacground based on time
// let BackgroundImage = `url(${DayBG})`;
// if (
//   // daytime
//   timezoneCalculation <= sunsetUnixTime &&
//   timezoneCalculation >= sunriseUnixTime
// ) {
//   BackgroundImage;
// } else if (
//   // nighttime
//   timezoneCalculation <= sunriseUnixTime &&
//   timezoneCalculation >= sunsetUnixTime
// ) {
//   BackgroundImage = `url(${NightBG})`;
// }
