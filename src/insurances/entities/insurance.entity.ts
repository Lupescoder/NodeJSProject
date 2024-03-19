import { InsuranceUser } from "src/insurance-users/entities/insurance-user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'convenios'})
export class Insurance {

    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    nome:string;

    @OneToMany(() => InsuranceUser, insuranceUser => insuranceUser.insurance)
    insuranceUsers: InsuranceUser[];

}
