export function formatRelativeDate(
  isoDateString: any,
  locale = "en-US",
  timeZone = undefined
) {
  if (!isoDateString || typeof isoDateString !== "string") {
    return "Invalid Date";
  }
  const date = new Date(isoDateString);
  const now = new Date();

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const startOfDay = (d: any) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const diffDays = Math.round(
    (startOfDay(now) - startOfDay(date)) / (1000 * 60 * 60 * 24)
  );
  let datePrefix = "";
  if (diffDays === 0) {
    datePrefix = "Today";
  } else if (diffDays === 1) {
    datePrefix = "Yesterday";
  }
  const timeOptions: any = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: timeZone,
  };
  const fullDateOptions: any = {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...timeOptions,
  };
  const timeFormatter = new Intl.DateTimeFormat(locale, timeOptions);
  const fullDateFormatter = new Intl.DateTimeFormat(locale, fullDateOptions);

  if (datePrefix) {
    const timeString = timeFormatter.format(date);
    return `${datePrefix}, ${timeString}`;
  } else {
    return fullDateFormatter.format(date);
  }
}
