import { ICONS, IconKey, IconType } from "../../modules/types";
import { useAppSelector } from "../../redux/hooks";
import { timeZoneConverter } from "../../modules/functions";
import NightIcon from "/images/Night.svg";

export const Icon = () => {
  const weatherDescription = useAppSelector(
    (state) => state.weather.data.weather.map((desc) => desc.main)[0]
  );
  const { timezone, dt } = useAppSelector((state) => state.weather.data);
  const { sunrise, sunset } = useAppSelector((state) => state.weather.data.sys);

  // timezone
  const timezoneCalculation = timeZoneConverter(dt, timezone);
  // convert sunrise time
  let sunriseUnixTime = timeZoneConverter(sunrise, timezone);
  // convert sunset time
  let sunsetUnixTime = timeZoneConverter(sunset, timezone);
  let weatherIcon = NightIcon;
  let returnVal = (obj: IconType, val: IconKey) => obj[val];

  if (
    // nighttime
    timezoneCalculation <= sunriseUnixTime &&
    timezoneCalculation >= sunsetUnixTime
  ) {
    return weatherIcon;
  } else if (
    timezoneCalculation <= sunsetUnixTime &&
    timezoneCalculation >= sunriseUnixTime
  ) {
    weatherIcon = returnVal(ICONS, weatherDescription);
  }
  return (
    <div className="WEATHER-ICON">
      <img
        src={weatherIcon}
        className="md:w-32 w-24 h-fit object-center"
        alt={weatherIcon}
      />
    </div>
  );
};
