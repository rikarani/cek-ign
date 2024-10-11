import { type CORSConfig } from "@elysiajs/cors";
import { type ElysiaSwaggerConfig } from "@elysiajs/swagger";

export const port = process.env.PORT || 6969;
export const corsConfig: CORSConfig = {
  credentials: false,
  origin: "*",
  methods: "GET",
};
export const swaggerConfig: ElysiaSwaggerConfig<"/playground"> = {
  path: "/playground",
  scalarConfig: {
    spec: {
      url: "/spec",
    },
    hideModels: true,
    darkMode: true,
    forceDarkModeState: "dark",
    hideDarkModeToggle: true,
    theme: "purple",
    defaultHttpClient: {
      targetKey: "javascript",
      clientKey: "fetch",
    },
  },
  documentation: {
    info: {
      title: "Cek IGN",
      description: "Dokumentasi + Playground",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  exclude: ["/spec"],
};
