import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserService } from "src/user/user.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
	imports: [TypeOrmModule.forFeature([User]), JwtModule],
	controllers: [AuthController],
	providers: [UserService, AuthService],
})
export class AuthModule {}
