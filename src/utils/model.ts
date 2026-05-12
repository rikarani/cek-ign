import { t, TSchema, UnwrapSchema } from "elysia";

type BadRequestExample = {
  path: string;
  message: string;
  summary: string;
};

type SuccessExample<T extends Record<string, TSchema>> = {
  game: string;
  account: { [K in keyof T]: UnwrapSchema<T[K]> } & { ign: string };
};

export const Model = {
  query<T extends Record<string, TSchema>>(schema: T) {
    return t.Object(schema);
  },
  success<T extends Record<string, TSchema>>(schema: T, example: SuccessExample<T>) {
    return t.Partial(
      t.Object(
        {
          success: t.Literal(true, { description: "status" }),
          data: t.Partial(
            t.Object({
              game: t.String({ description: "game yang di-request" }),
              account: t.Partial(
                t.Object({ ...schema, ign: t.String({ description: "in-game name" }) }, { description: "detail akun" }),
              ),
            }),
          ),
        },
        {
          description: "akun yang dicari ketemu",
          example: {
            success: true,
            data: example,
          },
        },
      ),
    );
  },
};

export const Error = {
  badRequest: (example: BadRequestExample[]) => {
    return t.Partial(
      t.Object(
        {
          success: t.Literal(false, { description: "status" }),
          errors: t.Array(
            t.Partial(
              t.Object(
                {
                  path: t.String({ description: "tempat salahnye" }),
                  message: t.String({ description: "pesan error singkat" }),
                  summary: t.String({ description: "pesan error panjang lebar" }),
                },
                {
                  description: "detail error",
                },
              ),
            ),
          ),
        },
        {
          description: "salah format request",
          example: {
            success: false,
            errors: example,
          },
        },
      ),
    );
  },
  notFound: t.Partial(
    t.Object(
      {
        success: t.Literal(false, { description: "status" }),
        error: t.Partial(
          t.Object(
            {
              code: t.String({ description: "kode error" }),
              message: t.String({ description: "pesan error" }),
            },
            { description: "detail error" },
          ),
        ),
      },
      {
        description: "akun yang dicari gak ketemu",
        example: {
          success: false,
          error: {
            code: "ACCOUNT_NOT_FOUND",
            message: "Akun Tidak Ditemukan",
          },
        },
      },
    ),
  ),
  invalidUid: t.Partial(
    t.Object(
      {
        success: t.Literal(false, { description: "status" }),
        error: t.Partial(
          t.Object(
            {
              code: t.String({ description: "kode error" }),
              message: t.String({ description: "pesan error" }),
            },
            { description: "detail error" },
          ),
        ),
      },
      {
        description: "format ID / UID tidak valid",
        example: {
          success: false,
          error: {
            code: "INVALID_UID",
            message: "masukkan UID yang benar",
          },
        },
      },
    ),
  ),
  serverError: t.Partial(
    t.Object(
      {
        success: t.Literal(false, { description: "status" }),
        error: t.Partial(
          t.Object(
            {
              code: t.String({ description: "kode error" }),
              message: t.String({ description: "pesan error" }),
            },
            { description: "detail error" },
          ),
        ),
      },
      {
        description: "ada error di server",
        example: {
          success: false,
          error: {
            code: "EXTERNAL_SERVER_ERROR",
            message: "Kesalahan saat melakukan request ke API Codashop",
          },
        },
      },
    ),
  ),
};
