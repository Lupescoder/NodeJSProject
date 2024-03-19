import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInProvider {

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @ApiProperty()
    userId: string

    @ApiProperty()
    name: string

    @ApiProperty()
    photo: string

    @ApiProperty()
    uid: string

    @ApiProperty()
    phoneNumber: string

    @ApiProperty()
    emailVerified: boolean

    @ApiProperty()
    token: string

    @ApiProperty()
    created: Date


}
