import { Controller, Get, Res, Param, HttpStatus, Post, Body } from "@nestjs/common";
import { DemoService } from "./demo.service";
import { Response } from "express";
import { validateUUID } from "../../lib/validation";
import { CreateDemoInput } from "./demo.model";

@Controller({ path: "demo", version: "1" })
export class DemoController {
    constructor(private readonly demoService: DemoService) {}

    @Post()
    async createDemo(@Body() payload: CreateDemoInput, @Res() res: Response) {
        const demo = await this.demoService.createDemo(payload);

        return res.status(HttpStatus.CREATED).json({
            message: "record created successfully",
            data: demo,
            statusCode: HttpStatus.CREATED,
        });
    }

    @Get(":id")
    async getDemo(@Res() res: Response, @Param("id") id: string) {
        if (!validateUUID(id)) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "bad input",
                statusCode: HttpStatus.BAD_REQUEST,
            });
        }

        const demo = await this.demoService.getDemo(id);

        if (!demo) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "record not found",
                statusCode: HttpStatus.NOT_FOUND,
            });
        }

        return res.status(HttpStatus.OK).json({
            message: "records fetched successfully",
            data: demo,
            statusCode: HttpStatus.OK,
        });
    }
}
