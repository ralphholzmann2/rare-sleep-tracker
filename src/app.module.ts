import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { EntryModule } from "./entry/entry.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { EntryController } from "./entry/entry.controller";
import { EntryService } from "./entry/entry.service";
import { User } from "./user/entities/user.entity";
import { Entry } from "./entry/entities/entry.entity";
@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: [".env.local", ".env"],
		}),
		UserModule,
		TypeOrmModule.forRoot({
			type: "sqlite",
			database: "rare-sleep-tracker.sqlite",
			entities: [`${__dirname}/**/*.entity{.ts,.js}`],
			synchronize: true,
			logging: true,
		}),
		TypeOrmModule.forFeature([User, Entry]),
		EntryModule,
		AuthModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get<string>("JWT_SECRET"),
				signOptions: { expiresIn: "1d" },
			}),
			inject: [ConfigService],
		}),
	],
	controllers: [AuthController, EntryController],
	providers: [AppService, AuthService, EntryService],
})
export class AppModule {}
