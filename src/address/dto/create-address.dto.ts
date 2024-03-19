import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateAddressDto {

    id:number;

    @ApiProperty()
    cep: string;

    @ApiProperty()
    rua: string;

    @ApiProperty()
    bairro: string;

    @ApiProperty()
    cidade: string;

    @ApiProperty()
    estado: string;
    
    @ApiProperty()
    complemento: string;

}
