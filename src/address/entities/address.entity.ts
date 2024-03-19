import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'enderecos'})
export class Address {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    usuario_id: number

    @Column()
    cep: string

    @Column()
    rua: string

    @Column()
    bairro: string

    @Column()
    cidade: string

    @Column()
    estado: string

    
    @Column()
    complemento: string

    toJSON() {
        return {
          id: this.id,
          usuario_id: this.usuario_id,
          cep: this.cep,
          rua: this.rua,
          bairro: this.bairro,
          cidade: this.cidade,
          estado: this.estado,
          complemento: this.complemento
        };
      }

}
