export function formatDateTime(timestamp: Date | string) {
  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    // second: 'numeric',
    // hour12: true,
  };

  // יצירת מחרוזת המייצגת את התאריך והזמן בפורמט הרצוי
  const formattedDateTime = date.toLocaleString('he-il', options);

  return formattedDateTime;
}
