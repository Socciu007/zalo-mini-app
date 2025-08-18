function areSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return areSameDay(date, today);
}

export function isTomorrow(date: Date): boolean {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return areSameDay(date, tomorrow);
}

export function displayTime(date: Date) {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}h${minutes}`;
}

export function displayHalfAnHourTimeRange(date: Date) {
  const endTime = new Date(date);
  endTime.setMinutes(endTime.getMinutes() + 30);
  return `${displayTime(date)} - ${displayTime(endTime)}`;
}

export function displayDate(date: Date, hint?: boolean) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  if (hint && isToday(date)) {
    return `Hôm nay - ${day}/${month}/${year}`;
  }
  if (hint && isTomorrow(date)) {
    return `Ngày mai - ${day}/${month}/${year}`;
  }
  return `${day}/${month}/${year}`;
}

export const getExpiryDate = (days: number = 3): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

export const timeUtil = (data: string, voyage: number): string => {
  const dateParts = data.split("-");
  if (dateParts.length !== 3) return "Invalid date";

  // Format MM-DD-YYYY to avoid error when using new Date
  const formattedDate = `${dateParts[1]}-${dateParts[2]}-${dateParts[0]}`;
  const baseDate = new Date(formattedDate);

  if (isNaN(baseDate.getTime())) return "Invalid date";

  const resultTime = baseDate.getTime() + voyage * 24 * 60 * 60 * 1000;
  const resultDate = new Date(resultTime);

  const year = resultDate.getFullYear();
  const month = String(resultDate.getMonth() + 1).padStart(2, '0');
  const day = String(resultDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};