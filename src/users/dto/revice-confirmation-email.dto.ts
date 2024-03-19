import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ReciveConfirmationEmailDto {
    
    @ApiProperty()
    @IsNotEmpty()
    token_email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

}
