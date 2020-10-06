import { IsString, MinLength } from "class-validator";

export class userDto {
    @IsString()
    name?: string;

    @IsString()
    username?: string;

    @IsString()
    @MinLength(8, {message: 'Email at least 8 character include @***.***'})
    email?: string;

    @IsString()
    @MinLength(8, {message: 'Password at least 8 character'})
    // @Matches() RegExp
    password?: string;
}