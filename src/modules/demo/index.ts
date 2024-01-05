import { Module } from "@nestjs/common";
import { DemoService } from "./demo.service";
import { DemoController } from "./demo.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Demo } from "./demo.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Demo])],
    controllers: [DemoController],
    providers: [DemoService],
    exports: [],
})
export class DemoModule {}
