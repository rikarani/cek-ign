import { t } from "elysia";

export abstract class Model {
  public static query() {
    return t.Object({
      id: t.String({
        description: "ID Akun yang mau dicek",
        example: "471192087",
      }),
      zone: t.String({
        description: "Zone Akun yang mau dicek",
        example: "2416",
      }),
    });
  }

  public static success() {
    return t.Partial(
      t.Object(
        {
          success: t.Literal(true),
          data: t.Partial(
            t.Object({
              game: t.String({ description: "Game yang di-request" }),
              account: t.Partial(
                t.Object(
                  {
                    id: t.String({ description: "ID yang tadi dimasukkan" }),
                    zone: t.String({ description: "Zone yang tadi dimasukkan" }),
                    ign: t.String({ description: "In-Game Name" }),
                  },
                  { description: "Detail Akun" },
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
              game: "Mobile Legends: Bang Bang",
              account: {
                id: "471192087",
                zone: "2416",
                ign: "Sa2-3",
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
          description: "salah format request",
          example: {
            success: false,
            errors: [
              {
                path: "/id",
                message: "Expected string",
                summary: "Expected property 'id' to be string but found: undefined",
              },
              {
                path: "/zone",
                message: "Expected string",
                summary: "Expected property 'zone' to be string but found: undefined",
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
            t.Object(
              {
                code: t.String({ description: "Kode Error" }),
                message: t.String({ description: "Pesan Kesalahan" }),
              },
              { description: "Detail Error" },
            ),
          ),
        },
        {
          description: "akun gak ketemu",
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

  public static serverError() {
    return t.Partial(
      t.Object(
        {
          success: t.Literal(false),
          error: t.Partial(
            t.Object(
              {
                code: t.String({ description: "Kode Error" }),
                message: t.String({ description: "Pesan Kesalahan" }),
              },
              { description: "Detail Error" },
            ),
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
