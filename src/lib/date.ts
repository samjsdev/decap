const DATE_ONLY_RE = /^\d{4}-\d{2}-\d{2}$/;

const formatLongDateUTC = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

const formatLongDateLocal = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

export function formatPublishedDate(dateString: string): string {
  if (DATE_ONLY_RE.test(dateString)) {
    const [year, month, day] = dateString.split('-').map(Number);
    return formatLongDateUTC.format(new Date(Date.UTC(year, month - 1, day)));
  }

  const parsed = new Date(dateString);

  if (Number.isNaN(parsed.getTime())) {
    return dateString;
  }

  return formatLongDateLocal.format(parsed);
}
