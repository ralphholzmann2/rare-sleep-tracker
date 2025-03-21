import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";

export class SignInUserDto {
  @ApiProperty({
    description: "Email address for the account being signed in",
    example: "test@test.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Password for the account being signed in",
    example: "super-Strong-Password-with-numbers123-and-symbols!@#",
  })
  password: string;
}
