import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Demo } from "./demo.entity";
import { CreateDemoInput } from "./demo.model";

@Injectable()
export class DemoService {
    constructor(@InjectRepository(Demo) private demoRepository: Repository<Demo>) {}

    async createDemo(payload: CreateDemoInput): Promise<Demo> {
        const existingDemo = await this.demoRepository.findOne({
            where: { firstName: payload.firstName.trim() },
        });

        if (existingDemo) {
            return existingDemo;
        }

        return await this.demoRepository.save(
            this.demoRepository.create({
                ...payload,
            }),
        );
    }

    async getDemo(id: string): Promise<Demo> {
        return await this.demoRepository.findOne({ where: { id } });
    }
}
