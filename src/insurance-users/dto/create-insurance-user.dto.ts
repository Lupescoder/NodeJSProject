import { ApiProperty } from "@nestjs/swagger";

export class CreateInsuranceUserDto {

    id: number;

    @ApiProperty()
    convenio_id:number;
    
    @ApiProperty()
    numeroCarteirinha:number;

    @ApiProperty()
    dataValidade:string;

}
