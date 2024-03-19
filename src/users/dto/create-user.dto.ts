import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    
    @ApiProperty()
    foto: string;

    @ApiProperty()
    @IsNotEmpty()
    nome: string;

    @ApiProperty()
    uid: string;

    @ApiProperty()
    @IsNotEmpty()
    sobrenome: string

    @ApiProperty()
    @IsNotEmpty()
    genero: string

    @ApiProperty()
    @IsNotEmpty()
    celular: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    cpf: string;

    @ApiProperty()
    @IsNotEmpty()
    datadenascimento: string;

    @ApiProperty()
    perfil_verificado_email: boolean

    @ApiProperty()
    created: Date;
}
