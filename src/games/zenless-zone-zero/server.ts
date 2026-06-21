import { InvalidUidError } from '../../utils/errors';

export const servers = {
  America: 'prod_gf_us',
  Asia: 'prod_gf_jp',
  Europe: 'prod_gf_eu',
  'TW, HK, MO': 'prod_gf_sg',
} as const;

export function getServer(uid: string): (typeof servers)[keyof typeof servers] {
  if (uid.startsWith('10')) {
    return servers.America;
  }

  if (uid.startsWith('15')) {
    return servers.Europe;
  }

  if (uid.startsWith('13')) {
    return servers.Asia;
  }

  if (uid.startsWith('17')) {
    return servers['TW, HK, MO'];
  }

  throw new InvalidUidError();
}

export type Server = keyof typeof servers;
