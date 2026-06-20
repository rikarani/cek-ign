import { InvalidUidError } from '../../utils/errors';

export const servers = {
  America: 'os_usa',
  Asia: 'os_asia',
  Europe: 'os_euro',
  'TW, HK, MO': 'os_cht',
} as const;

export function getServer(uid: string) {
  if (uid.startsWith('6')) {
    return servers.America;
  }

  if (uid.startsWith('7')) {
    return servers.Europe;
  }

  if (uid.startsWith('8') || uid.startsWith('18')) {
    return servers.Asia;
  }

  if (uid.startsWith('9')) {
    return servers['TW, HK, MO'];
  }

  throw new InvalidUidError();
}

export type Server = keyof typeof servers;
