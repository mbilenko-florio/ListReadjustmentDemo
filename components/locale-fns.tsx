import { isToday, isYesterday } from "date-fns";

const deviceLocale = "en_US";

const toJsLocaleFormat = (locale: string) => {
  return locale.replace("_", "-");
};

const t = (key: string) => key;

export const getFormattedDate = (dateString: Date, showTime?: boolean) => {
  return new Date(dateString).toLocaleDateString(
    toJsLocaleFormat(deviceLocale),
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: showTime ? "2-digit" : undefined,
      minute: showTime ? "2-digit" : undefined,
      hour12: false,
    }
  );
};

export const getFormattedDateWithTodayTomorrow = (
  dateString: Date,
  showTime?: boolean
) => {
  const time = new Date(dateString).toLocaleTimeString(
    toJsLocaleFormat(deviceLocale),
    {
      hour: showTime ? "2-digit" : undefined,
      minute: showTime ? "2-digit" : undefined,
      second: undefined,
      hour12: false,
    }
  );
  if (isToday(dateString)) {
    if (showTime) {
      return t("common_today") + ", " + time;
    }
    return t("common_today");
  }
  if (isYesterday(dateString)) {
    if (showTime) {
      return t("yesterday") + ", " + time;
    }
    return t("yesterday");
  }
  return new Date(dateString).toLocaleDateString(
    toJsLocaleFormat(deviceLocale),
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: showTime ? "2-digit" : undefined,
      minute: showTime ? "2-digit" : undefined,
      hour12: false,
    }
  );
};
