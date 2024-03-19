import { ApiProperty } from "@nestjs/swagger";

export class CreateMedicationHistoryDto {

    id: number;

    @ApiProperty()
    descricaoMedicamentosUsadosAtual:string;

    @ApiProperty()
    naoUsaMedicamentosAtual:boolean;

    @ApiProperty()
    descricaoMedicamentosUsadosPassados:string;

    @ApiProperty()
    naoUsaMedicamentosPassado:boolean;

}
