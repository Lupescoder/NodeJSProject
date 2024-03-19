import { ApiProperty } from "@nestjs/swagger";

export class CreateMedicalHistoryDto {

    id: number;

    @ApiProperty()
    descricaoDoenca:string;

    @ApiProperty()
    possuiHistMedico:boolean;

    @ApiProperty()
    descricaoDoencasFamiliar:string;

    @ApiProperty()
    possuiHistFamiliar:boolean;

    @ApiProperty()
    descricaoAlergias:string;

    @ApiProperty()
    possuiAlergias:boolean;

    @ApiProperty()
    observacoes:string;

    @ApiProperty()
    possuiObservacao:boolean;

}
