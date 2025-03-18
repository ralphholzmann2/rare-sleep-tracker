import { NestFactory, PartialGraphHost } from "@nestjs/core";
import { AppModule } from "./app.module";
import { writeFileSync } from "node:fs";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		snapshot: true,
		abortOnError: false,
	});
	await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
	writeFileSync("graph.json", PartialGraphHost.toString() ?? "");
	process.exit(1);
});
