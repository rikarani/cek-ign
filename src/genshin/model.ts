import { t } from "elysia";

const success = t.Partial(
  t.Object({
    success: t.Literal(true),
    data: t.Partial(
      t.Object({
        game: t.String(),
        account: t.Partial(
          t.Object({
            uid: t.String(),
            server: t.String(),
            ign: t.String(),
          }),
        ),
      }),
    ),
  }),
);

export const model = {
  query: t.Object({
    uid: t.String({
      description: "UID Akun",
      example: "800029362",
    }),
  }),
  response: { success },
};
