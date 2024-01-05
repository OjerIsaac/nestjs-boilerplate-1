import { IsNotEmpty, IsString } from "class-validator";

export class CreateDemoInput {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;
}
