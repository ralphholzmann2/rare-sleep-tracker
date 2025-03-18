import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      throw new ConflictException('User with that email already exists');
    }

		const hashedPassword = await bcrypt.hash(password, 10);
		return this.userService.create({
			email,
			password: hashedPassword,
		});
	}
}
