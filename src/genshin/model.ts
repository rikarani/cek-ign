import { t } from "elysia";

export abstract class Model {
  public static query() {
    return t.Object({
      uid: t.String({ description: "uid akun yang mau dicari", example: "800029362" }),
    });
  }

  public static success() {
    return t.Partial(
      t.Object(
        {
          success: t.Literal(true),
          data: t.Partial(
            t.Object({
              game: t.String({ description: "game yang direquest" }),
              account: t.Partial(
                t.Object(
                  {
                    uid: t.String({ description: "uid akun yang dicari" }),
                    server: t.String({ description: "server akun" }),
                    ign: t.String({ description: "in-game name" }),
                  },
                  {
                    description: "detail akun",
                  },
                ),
              ),
            }),
          ),
        },
        {
          description: "akun ketemu",
          example: {
            success: true,
            data: {
              game: "Genshin Impact",
              account: {
                uid: "800029362",
                server: "Asia",
                ign: "A***a",
              },
            },
          },
        },
      ),
    );
  }

  public static badRequest() {
    return t.Partial(
      t.Object(
        {
          success: t.Literal(false),
          errors: t.Array(
            t.Partial(
              t.Object({
                path: t.String(),
                message: t.String(),
                summary: t.String(),
              }),
            ),
          ),
        },
        {
          description: "lupa ngirim UID",
          example: {
            success: false,
            errors: [
              {
                path: "/uid",
                message: "Expected string",
                summary: "Expected property 'uid' to be string but found: undefined",
              },
            ],
          },
        },
      ),
    );
  }

  public static notFound() {
    return t.Partial(
      t.Object(
        {
          success: t.Literal(false),
          error: t.Partial(
            t.Object({
              code: t.String({ description: "kode error" }),
              message: t.String({ description: "pesan error" }),
            }),
          ),
        },
        {
          description: "akun nda ketemu",
          example: {
            success: false,
            error: {
              code: "ACCOUNT_NOT_FOUND",
              message: "Akun Tidak Ditemukan",
            },
          },
        },
      ),
    );
  }

  public static wrongUid() {
    return t.Partial(
      t.Object(
        {
          success: t.Literal(false),
          error: t.Partial(
            t.Object({
              code: t.String({ description: "kode error" }),
              message: t.String({ description: "pesan error" }),
            }),
          ),
        },
        {
          description: "format uid nguwawor",
          example: {
            success: false,
            error: {
              code: "INVALID_UID",
              message: "Masukkan UID yang bener",
            },
          },
        },
      ),
    );
  }

  public static serverError() {
    return t.Partial(
      t.Object(
        {
          success: t.Literal(false),
          error: t.Partial(
            t.Object({
              code: t.String({ description: "kode error" }),
              message: t.String({ description: "pesan error" }),
            }),
          ),
        },
        {
          description: "ada error di api codashop",
          example: {
            success: false,
            error: {
              code: "EXTERNAL_SERVER_ERROR",
              message: "Gagal melakukan request ke API Codashop",
            },
          },
        },
      ),
    );
  }
}
