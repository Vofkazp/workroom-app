export const computedEstimate = (duration: number | null) => {
  if (duration === null || duration === 0) return "";
  const days = Math.trunc(duration / 1440);
  const hours = Math.trunc((duration % 1440) / 60);
  const minutes = duration % 60;
  const parts: string[] = [];
  if (days) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  return parts.join(" ");
}