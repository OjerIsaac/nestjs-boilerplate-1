import { Controller, Get, Res, Param, HttpStatus } from "@nestjs/common";
import { DemoService } from "./demo.service";
import { Response } from "express";
import { validateUUID } from "../../lib/validation";

@Controller()
export class DemoController {
    constructor(private readonly demoService: DemoService) {}

    @Get()
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
