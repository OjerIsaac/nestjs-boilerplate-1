import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DemoService } from "./demo.service";
import { Demo } from "./demo.entity";
import { DemoController } from "./demo.controller";

describe("DemoService", () => {
    let demoService: DemoService;
    const demoRepositoryToken = getRepositoryToken(Demo);
    let demoRepository: Repository<Demo>;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DemoController],
            providers: [
                DemoService,
                {
                    provide: demoRepositoryToken,
                    useValue: {
                        findOne: jest.fn(),
                        save: jest.fn(),
                        create: jest.fn(),
                        find: jest.fn(),
                    },
                },
            ],
        }).compile();

        demoService = module.get<DemoService>(DemoService);
        demoRepository = module.get<Repository<Demo>>(demoRepositoryToken);
    });

    describe("Testing <createDemo>", () => {
        it("it should create a new demo", async () => {
            const payload = {
                firstName: "isaac",
                lastName: "ojerumu",
            };
            const saveDemo = {
                id: "4f307dac-6973-4780-8c71-58c8728c3758",
                firstName: payload.firstName,
                lastName: payload.lastName,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            jest.spyOn(demoRepository, "create").mockReturnValueOnce(saveDemo);
            jest.spyOn(demoRepository, "save").mockResolvedValueOnce(saveDemo);

            const response = await demoService.createDemo(payload);

            expect(demoRepository.create).toHaveBeenCalledWith(payload);
            expect(demoRepository.save).toHaveBeenCalledWith(saveDemo);
            expect(response).toEqual(saveDemo);
        });
    });

    describe("Testing <getDemo>", () => {
        it("should return a demo by id", async () => {
            const demo: Demo = {
                id: "4f307dac-6973-4780-8c71-58c8728c3758",
                firstName: "isaac",
                lastName: "ojerumu",
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            jest.spyOn(demoRepository, "findOne").mockResolvedValueOnce(demo);

            const result = await demoService.getDemo(demo.id);

            expect(demoRepository.findOne).toHaveBeenCalledWith({ where: { id: demo.id } });
            expect(result).toEqual(demo);
        });

        it("should return null if demo not found", async () => {
            jest.spyOn(demoRepository, "findOne").mockResolvedValueOnce(null);

            const result = await demoService.getDemo("1");

            expect(demoRepository.findOne).toHaveBeenCalledWith({ where: { id: "1" } });
            expect(result).toEqual(null);
        });
    });
});
