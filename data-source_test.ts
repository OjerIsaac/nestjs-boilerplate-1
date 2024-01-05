import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config";

export default new DataSource({
    type: "postgres",
    host: process.env.TEST_DATABASE_HOST,
    port: Number(process.env.TEST_DATABASE_PORT),
    username: process.env.TEST_DATABASE_USERNAME,
    password: process.env.TEST_DATABASE_PASSWORD,
    database: process.env.TEST_DATABASE_NAME,
    migrations: ["src/migrations/**/*.ts"],
});
