export const servers = {
  America: 'os_usa',
  Asia: 'os_asia',
  Europe: 'os_euro',
  'TW, HK, MO': 'os_cht',
} as const;

export type Server = keyof typeof servers;
