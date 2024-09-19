import { Genshin } from "@/types/Server";
import { InvalidUID } from "@/errors/InvalidUID";

type Params = {
  uid: string;
};

export function getServer({ uid }: Params): Genshin {
  if (uid.startsWith("6")) {
    return Genshin.America;
  }

  if (uid.startsWith("7")) {
    return Genshin.Europe;
  }

  if (uid.startsWith("8") || uid.startsWith("18")) {
    return Genshin.Asia;
  }

  if (uid.startsWith("9")) {
    return Genshin.TW_HK_MO;
  }

  throw new InvalidUID("taroh UID yang bener anying");
}
