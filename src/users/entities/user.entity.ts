import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'usuarios'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uid: string;

    @Column()
    foto: string;

    @Column()
    nome: string;

    @Column()
    sobrenome: string;

    @Column()
    genero: string;

    @Column()
    celular: string;

    @Column()
    email: string;

    
    @Column()
    password: string;

    @Column()
    cpf: string;

    @Column({ type: 'date' })
    datadenascimento: string;

    @Column({ default: false})
    perfil_verificado_email: boolean

    @Column()
    perfil_verificado_celular: boolean;

    @Column()
    perfil_verificado_cpf: boolean;

    @Column()
    token_senha: string

    @Column()
    token_email: string;

    @Column()
    token_sms: string;

    @Column()
    grupo_id: string;

    @Column()
    is_medico: boolean;

    @Column()
    created: Date;

    @Column()
    modified: Date;

    @Column()
    deleted_at: Date;

    toJSON() {
        return {
          id: this.id,
          foto: this.foto,
          nome: this.nome,
          sobrenome: this.sobrenome,
          genero: this.genero,
          celular: this.celular,
          email: this.email,
          cpf: this.cpf,
          datadenascimento: this.datadenascimento,
          perfil_verificado_email: this.perfil_verificado_email,
          perfil_verificado_celular: this.perfil_verificado_celular,
          perfil_verificado_cpf: this.perfil_verificado_cpf,
          grupo_id: this.grupo_id,
          is_medico: this.is_medico,
          created: this.created,
          modified: this.modified,
          deleted_at: this.deleted_at
        };
      }
}
