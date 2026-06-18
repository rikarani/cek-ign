export function decodeIgn(ign: string): string {
  return decodeURIComponent(ign).replace(/\+/g, ' ');
}
