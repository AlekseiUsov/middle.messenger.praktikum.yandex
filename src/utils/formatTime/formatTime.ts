export function formatTime(
  isoString: string,
  timeZone = "Europe/Moscow",
  locale = "ru-RU"
) {
  const fullDate = new Date(isoString);
  const date = fullDate.toLocaleString(locale, { timeZone }).slice(0, 10);
  const time = fullDate.toLocaleTimeString(locale, { timeZone }).slice(0, 5);

  return `${date} ${time}`;
}
