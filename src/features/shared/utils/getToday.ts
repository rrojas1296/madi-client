export const getToday = (locale: "es" | "en") => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat(
    locale === "es" ? "es-Es" : "en-Us",
    options,
  ).format(today);
  return formattedDate;
};
