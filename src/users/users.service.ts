import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { AppService } from 'src/app.service';
import { ReciveConfirmationEmailDto } from './dto/revice-confirmation-email.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private readonly userRepository:Repository<User>,
    private readonly appService:AppService,
    private emailService:EmailService){}


  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const user = this.userRepository.create(createUserDto); 
    user.password = await bcrypt.hash(createUserDto.password, await bcrypt.genSalt() );
    user.datadenascimento = user.datadenascimento ? this.appService.convertDate(createUserDto.datadenascimento,'dd/MM/yyyy', 'yyyy-MM-dd') : '';
    user.cpf = this.appService.formatOnlyNumber(createUserDto.cpf);
    user.celular = this.appService.formatOnlyNumber(createUserDto.celular);
    this.sendEmailCode(user);
    return await this.userRepository.save(user);
  }

  async createProvider(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const user = this.userRepository.create(createUserDto); 
    return await this.userRepository.save(user);
  }

  async updateUid(email:string, uid: string): Promise<void>{
    const user = await this.userRepository.findOne({ where: { email } });
    await this.userRepository.update(user.id, {uid: uid});
  }

  async sendEmailCode(user: User): Promise<string>{
    const verificationCodes = Math.floor(Math.random() * 90000) + 10000 + '';

    user.token_email = verificationCodes;
    await this.emailService.sendConfirmationEmail(user.email, user.token_email, user, 'email');
    return verificationCodes;
  }

  async findAllUsers(): Promise<{users: User[]}> {
    const users = await this.userRepository.find();
    users.map(user => {
      user.datadenascimento = user.datadenascimento ?  this.appService.convertDate(user.datadenascimento,'yyyy-MM-dd', 'dd/MM/yyyy') : '';
      user.cpf = this.appService.returnFormatCpf(user.cpf);
      user.celular = this.appService.returnFormatPhone(user.celular);
    });
    
    return { users };

  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if(!user){
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    user.datadenascimento = user.datadenascimento ?  this.appService.convertDate(user.datadenascimento,'yyyy-MM-dd', 'dd/MM/yyyy'): '';
    user.cpf = user.cpf ? this.appService.returnFormatCpf(user.cpf) : '';
    user.celular = user.celular ? this.appService.returnFormatPhone(user.celular) : '';
    return user;
    
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }else{
      user.datadenascimento = user.datadenascimento ? this.appService.convertDate(user.datadenascimento,'yyyy-MM-dd', 'dd/MM/yyyy') : '';
      user.cpf = user.cpf ? this.appService.returnFormatCpf(user.cpf): '';
      user.celular = user.celular ? this.appService.returnFormatPhone(user.celular): '';
      return user;
    }
    
  }
  async verifyEmailExist(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }
  
  async verifyUidExist(uid: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { uid } });
    return user;
  }
  

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateUserDto> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    
    updateUserDto.datadenascimento && (updateUserDto.datadenascimento = this.appService.convertDate(updateUserDto.datadenascimento, 'dd/MM/yyyy', 'yyyy-MM-dd'));
    updateUserDto.cpf && (updateUserDto.cpf = this.appService.formatOnlyNumber(updateUserDto.cpf));
    updateUserDto.celular && (updateUserDto.celular = this.appService.formatOnlyNumber(updateUserDto.celular));

    await this.userRepository.update(id, updateUserDto)

    return updateUserDto;
  }

  async remove(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }else{
      await this.userRepository.remove(user);
      user.datadenascimento = this.appService.convertDate(user.datadenascimento,'yyyy-MM-dd', 'dd/MM/yyyy');
      user.cpf = this.appService.returnFormatCpf(user.cpf);
      return user;
    }
  }

  async reciveConfirmationEmail(reciveConfirmationEmailDto: ReciveConfirmationEmailDto): Promise<User>{
    const user = await this.findOneByEmail(reciveConfirmationEmailDto.email);
    if (!user) {
      throw new HttpException('Dados não encontrado', HttpStatus.NOT_FOUND);
    }

    if( user.token_email != reciveConfirmationEmailDto.token_email){
      throw new HttpException('Código Inválido, tente novamente ou entre em contato com nosso suporte.', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.update(user.id, {token_email: '', perfil_verificado_email: true } )

    return user;

  }

  async resendConfirmationEmail(email: string): Promise<void>{
    const user = await this.findOneByEmail(email);
    await this.userRepository.update(user.id, {token_email: await this.sendEmailCode(user) } );
  }

  async recoverPassword(email:string, password:string):Promise<User>{
    const user = await this.findOneByEmail(email);
    await this.userRepository.update(user.id, {password: await bcrypt.hash(password, await bcrypt.genSalt() )} )
    return user;
  }

  async changePassword(id:number, oldPassword:string, password:string): Promise<User>{
    const user = await this.findOneById(id);
    const validatePass = await bcrypt.compare(oldPassword,  user.password);

    if(!validatePass){ 
        throw new UnauthorizedException('Senha Incorreta');
    }
    return await this.recoverPassword(user.email,password);
  }

  async sendPasswordCode(user:User): Promise<void>{
    const verificationCodes = Math.floor(Math.random() * 90000) + 10000 + '';

    await this.userRepository.update(user.id, {token_senha: verificationCodes} )
    await this.emailService.sendConfirmationEmail(user.email,verificationCodes, user, 'senha');
  }

}
