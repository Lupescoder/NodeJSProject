import { Insurance } from "src/insurances/entities/insurance.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'convenios_usuarios'})
export class InsuranceUser {
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    usuario_id:number;

    @Column()
    convenio_id:number;

    @Column()
    numeroCarteirinha:number;

    @Column({ type: 'date' })
    dataValidade:string;


    @ManyToOne(() => Insurance, insurance => insurance.insuranceUsers)
    @JoinColumn({ name: "convenio_id", referencedColumnName: "id" })
    insurance: Insurance;

    qtd: number;

}
