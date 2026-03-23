import type { CORSConfig } from "@elysiajs/cors";
import type { ElysiaOpenAPIConfig } from "@elysiajs/openapi";

type Config = {
  port: number | string;
  cors: CORSConfig;
  openapi: ElysiaOpenAPIConfig<true>;
};

export const config = {
  port: process.env.PORT || 6969,
  cors: {
    origin: "*",
    methods: ["GET"],
    credentials: false,
  },
  openapi: {
    enabled: true,
    scalar: {
      hideModels: true,
      operationTitleSource: "path",
      orderSchemaPropertiesBy: "preserve",
    },
    documentation: {
      info: {
        version: "1.0.0",
        title: "Dokumentasi API - Cek IGN",
        description: "Tool untuk ngecek In-Game Name berbagai game online",
      },
    },
    exclude: {
      paths: ["/"],
    },
  },
} satisfies Config;
