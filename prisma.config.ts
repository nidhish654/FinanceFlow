import { defineConfig, env } from "@prisma/config";
import "dotenv/config";

export default defineConfig({
    // Explicitly specify the engine type
    engine: "classic",
    datasource: {
        url: env("DATABASE_URL"),
    },
});