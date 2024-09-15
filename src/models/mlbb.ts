import { Elysia, t } from "elysia";

export const mlbbModel = new Elysia().model({
  "mlbb.query": t.Object({
    id: t.String(),
    zone: t.String(),
  }),
  "mlbb.response": t.Object({
    ign: t.String(),
    userId: t.String(),
    zoneId: t.String(),
  }),
});
