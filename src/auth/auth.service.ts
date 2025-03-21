import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";

export type JWTBody = {
  sub: number;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      throw new ConflictException("User with that email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userService.create({
      email,
      password: hashedPassword,
    });

    return this.userService.findByEmail(email);
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return {
      jwt: await this.jwtService.signAsync({ sub: user.id } as JWTBody),
    };
  }
}
