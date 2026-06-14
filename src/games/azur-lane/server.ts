export const servers = {
  Avrora: '1',
  Lexington: '2',
  Sandy: '3',
  Washington: '4',
  Amagi: '5',
  'Little Enterprise': '6',
} as const;

export type ServerName = keyof typeof servers;
