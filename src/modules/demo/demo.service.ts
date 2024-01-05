import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Demo } from "./demo.entity";

@Injectable()
export class DemoService {
    constructor(@InjectRepository(Demo) private demoRepository: Repository<Demo>) {}

    async getDemo(id: string): Promise<Demo> {
        return await this.demoRepository.findOne({ where: { id } });
    }
}
