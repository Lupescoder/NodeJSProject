import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'historicosMedicos'})
export class MedicalHistory {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    usuario_id:number;

    @Column()
    descricaoDoenca:string;

    @Column()
    possuiHistMedico:boolean;

    @Column()
    descricaoDoencasFamiliar:string;

    @Column()
    possuiHistFamiliar:boolean;

    @Column()
    descricaoAlergias:string;

    @Column()
    possuiAlergias:boolean;

    @Column()
    observacoes:string;

    @Column()
    possuiObservacao:boolean;

}
