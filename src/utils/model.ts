import { t } from "elysia";

export const Error = {
  notFound: t.Partial(
    t.Object({
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
    }),
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

  serverError: t.Partial(
    t.Object({
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
    }),
    {
      description: "ada error di server",
      example: {
        success: false,
        error: {
          code: "EXTERNAL_SERVER_ERROR",
          message: "Gagal melakukan request ke API Codashop",
        },
      },
    },
  ),
};
