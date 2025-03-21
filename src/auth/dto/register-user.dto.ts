import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";

export class RegisterUserDto {
  @ApiProperty({
    description: "Email address for the account being registered",
    example: "test@test.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Password for the account being registered",
    example: "super-Strong-Password-with-numbers123-and-symbols!@#",
  })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}
