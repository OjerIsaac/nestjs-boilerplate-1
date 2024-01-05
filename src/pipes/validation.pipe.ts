import { Injectable, BadRequestException, ValidationPipe as DefaultValidationPipe } from "@nestjs/common";

@Injectable()
export class ValidationPipe extends DefaultValidationPipe {
    constructor() {
        super({
            stopAtFirstError: true,
            transform: true,
            whitelist: true,
            disableErrorMessages: true,
            exceptionFactory: () => new BadRequestException("Input Validation failed"),
        });
    }
}
