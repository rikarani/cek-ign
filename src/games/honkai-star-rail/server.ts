import { InvalidUidError } from '../../utils/errors';

export const servers = {
  America: 'prod_official_usa',
  Asia: 'prod_official_asia',
  Europe: 'prod_official_eur',
  'TW, HK, MO': 'prod_official_cht',
} as const;

export function getServer(uid: string): (typeof servers)[keyof typeof servers] {
  if (uid.startsWith('6')) {
    return servers.America;
  }

  if (uid.startsWith('7')) {
    return servers.Europe;
  }

  if (uid.startsWith('8')) {
    return servers.Asia;
  }

  if (uid.startsWith('9')) {
    return servers['TW, HK, MO'];
  }

  throw new InvalidUidError();
}

export type Server = keyof typeof servers;
