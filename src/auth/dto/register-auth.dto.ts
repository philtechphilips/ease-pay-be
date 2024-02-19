import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class RegisterAuthDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    password: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    username: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    full_name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @Length(1, 255)
    @IsNotEmpty()
    phone: string;
}
