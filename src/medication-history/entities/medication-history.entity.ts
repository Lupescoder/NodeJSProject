import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'historicosMedicamentos'})
export class MedicationHistory {
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    usuario_id:number;

    @Column()
    descricaoMedicamentosUsadosAtual:string;

    @Column()
    naoUsaMedicamentosAtual:boolean;

    @Column()
    descricaoMedicamentosUsadosPassados:string;

    @Column()
    naoUsaMedicamentosPassado:boolean;

}
