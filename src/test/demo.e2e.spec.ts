import { INestApplication, VersioningType } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../app.module";
import { getDataSourceToken } from "@nestjs/typeorm";
import { Demo } from "../modules/demo/demo.entity";
import { UUID_REGEX } from "../lib/validation";

describe("DemoRoutes (e2e)", () => {
    let app: INestApplication;
    let demo: Demo;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.enableVersioning({
            type: VersioningType.URI,
        });
        await app.init();
    });

    describe("/v1/demo (POST)", () => {
        it("should create a new demo", async () => {
            const response = await request(app.getHttpServer())
                .post("/v1/demo")
                .send({
                    firstName: "Ejiro",
                    lastName: "Ebuka",
                })
                .set("Content-Type", "application/json")
                .set("Accept", "application/json");

            expect(response.status).toEqual(201);
            expect(response.body.message).toEqual("record created successfully");
            expect(response.body.statusCode).toStrictEqual(201);
            expect(response.body.data.id).toEqual(expect.stringMatching(UUID_REGEX));
            expect(response.body.data.firstName).toEqual("Ejiro");
            demo = response.body.data;
        });
    });

    describe("/v1/demo/:id (GET)", () => {
        it("should get a demo by id", async () => {
            const response = await request(app.getHttpServer()).get(`/v1/demo/${demo.id}`).expect(200);

            expect(response.body.data.id).toBe(demo.id);
        });

        it("should return 404 if demo not found ", async () => {
            const invalidDemoId = "fad21327-62d3-42eb-a660-bcfcb65d6bd3";
            const response = await request(app.getHttpServer()).get(`/v1/demo/${invalidDemoId}`).expect(404);

            expect(response.body.message).toStrictEqual("record not found");
        });

        it("should return bad input error if id not valid uuid", async () => {
            const demoId = "dafdjafjdadlfjdlk";
            const response = await request(app.getHttpServer()).get(`/v1/demo/${demoId}`).expect(400);

            expect(response.body.message).toStrictEqual("bad input");
        });
    });

    afterAll(async () => {
        const connection = app.get(getDataSourceToken());
        await connection.query('TRUNCATE "demo" CASCADE;');
        await app.close();
    });
});
