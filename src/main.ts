import { NestFactory, PartialGraphHost, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { writeFileSync } from "node:fs";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    abortOnError: false,
  });
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle("Rare Sleep Tracker")
    .setDescription("API for tracking your sleep")
    .setVersion("1.0")
    .addTag("sleep")
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      name: "Authorization",
      description: "JWT Authorization header using the Bearer scheme",
    })
    .build();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(cookieParser(configService.get<string>("COOKIE_SECRET")));

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);

  await app.listen(Number(configService.get<number>("PORT")) ?? 3000);
}

bootstrap().catch((err) => {
  writeFileSync("graph.json", PartialGraphHost.toString() ?? "");
  process.exit(1);
});
