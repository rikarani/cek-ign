import { t } from "elysia";

type Example = {
  path: string;
  message: string;
  summary: string;
};

export const Error = {
  badRequest: (example: Example[]) => {
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
