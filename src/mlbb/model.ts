import { t } from "elysia";

const success = t.Partial(
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
      description: "Akun ketemu",
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

const badRequest = t.Partial(
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
      description: "Salah Format Request",
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

const notFound = t.Partial(
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
      description: "Akun gak ketemu",
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

const serviceUnavailable = t.Partial(
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
      description: "Layanan Tidak Tersedia",
      example: {
        success: false,
        error: {
          code: "EXTERNAL_SERVER_ERROR",
          message: "Layanan Tidak Tersedia",
        },
      },
    },
  ),
);

export const model = {
  query: t.Object({
    id: t.String({
      description: "ID Akun yang mau dicek",
      example: "471192087",
    }),
    zone: t.String({
      description: "Zone Akun yang mau dicek",
      example: "2416",
    }),
  }),
  response: { success, badRequest, notFound, serviceUnavailable },
};
