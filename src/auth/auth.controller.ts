import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import { SignInUserDto } from "./dto/sign-in-user.dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("register")
	create(@Body() registerUserDto: RegisterUserDto) {
		return this.authService.signUp(
			registerUserDto.email,
			registerUserDto.password,
		);
	}

	@Post("login")
	login(@Body() loginUserDto: SignInUserDto) {
		return this.authService.signIn(loginUserDto.email, loginUserDto.password);
	}
}
