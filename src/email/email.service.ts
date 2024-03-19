import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendConfirmationEmail(email:string, confirmationCode:string, user:User, tipo: string): Promise<void> {
        try {
             await this.mailerService.sendMail({
                to: email,
                from: process.env.USER_MAIL,
                subject: 'Confirmação de E-mail',
                template: './confirmation',
                context: {
                    confirmationCode,
                    username : user.nome,
                    tipo: tipo
                }
            })
        } catch (error) {
            console.error(`Erro ao enviar e-mail de confirmação para ${email}:`, error);
            throw new Error(`Falha ao enviar e-mail de confirmação para ${email}`);
        }
    }
}
