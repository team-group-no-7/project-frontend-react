export const parseDate = (dateStr) => {
  if (!dateStr) return new Date(0);
  let date = new Date(dateStr);
  if (isNaN(date.getTime()) && typeof dateStr === "string") {
    // Handle DD/MM/YYYY format like "20/07/2026T10:30:00Z" or "20/07/2026"
    const match = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})(.*)$/);
    if (match) {
      const [, day, month, year, rest] = match;
      date = new Date(`${year}-${month}-${day}${rest}`);
    }
  }
  return isNaN(date.getTime()) ? new Date(0) : date;
};

export const formatDate = (dateStr) => {
  const date = parseDate(dateStr);
  if (isNaN(date.getTime()) || date.getTime() === 0) {
    return "N/A";
  }
  return date.toLocaleDateString("en-GB");
};
