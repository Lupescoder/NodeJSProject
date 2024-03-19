import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UpdateUserDto  {
    @ApiProperty()
    foto?: string;

    @ApiProperty()
    nome?: string;

    @ApiProperty()
    uid?: string;

    @ApiProperty()
    sobrenome?: string

    @ApiProperty()
    genero?: string

    @ApiProperty()
    celular?: string;

    @ApiProperty()
    email?: string;

    @ApiProperty()
    password?: string;

    @ApiProperty()
    cpf?: string;

    @ApiProperty()
    datadenascimento?: string;

    @ApiProperty()
    perfil_verificado_email?: boolean

    @ApiProperty()
    created?: Date;
}
