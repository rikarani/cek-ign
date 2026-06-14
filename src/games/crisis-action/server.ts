export const servers = {
  Alliance: '2001',
  Avenger: '2003',
  Creator: '2007',
  Guardian: '2006',
  Ranger: '2005',
  Rebels: '2002',
  Savior: '2004',
} as const;

export type Servers = keyof typeof servers;
