import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as compression from "compression";
import helmet from "helmet";
import { VersioningType } from "@nestjs/common";
import { ValidationPipe } from "./pipes/validation.pipe";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        rawBody: true,
    });

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.use(compression());
    app.use(helmet());
    app.enableCors({
        credentials: true,
        origin: [process.env.WEBSITE_URL, "http://localhost:3000", "http://localhost:3001"],
    });
    app.enableVersioning({
        type: VersioningType.URI,
    });
    await app.listen(Number(process.env.PORT) || 3000);
}
bootstrap();
