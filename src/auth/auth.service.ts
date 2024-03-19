import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { AddressService } from 'src/address/address.service';
import { MedicalHistoryService } from 'src/medical-history/medical-history.service';
import { MedicationHistoryService } from 'src/medication-history/medication-history.service';
import { User } from 'src/users/entities/user.entity';
import admin from 'src/firebase.config';
import { SignInProvider } from './dto/singin.provider.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private addressService: AddressService,
        private medicalHistoryService: MedicalHistoryService,
        private medicationHistoryService: MedicationHistoryService){}


    async generateJWT(user: User): Promise<string>{

        if(!user.uid){
            return await admin.auth().createCustomToken(user.id.toString()).then((token) => {
                return token;
            })
        }

        return await admin.auth().createCustomToken(user.uid.toString()).then((token) => {
            return token;
        })

    }

    async signIn(email: string, pass: string): Promise<Object>{
        const user = await this.usersService.findOneByEmail(email);
        const address = await this.addressService.findAddressByUser(user.id);
        const medicalHistory = await this.medicalHistoryService.findOne(user.id);
        const medicationHistory = await this.medicationHistoryService.findOne(user.id);
        
        const validatePass = await bcrypt.compare(pass,  user.password);
        if(!validatePass){ 
            throw new UnauthorizedException();
        }
        
        return {
            user,
            medicalHistory : medicalHistory ? medicalHistory : {},
            medicationHistory: medicationHistory ? medicationHistory: {},
            ...(address ? { address } : {} ),
            access_token: await this.generateJWT(user),
        };

    }

    async signInProvider(signInProvider:SignInProvider): Promise<Object>{
        var createUserDto = new CreateUserDto();
        
        createUserDto.email = signInProvider.email;
        createUserDto.foto = signInProvider.photo;
        createUserDto.celular = signInProvider.phoneNumber;
        createUserDto.perfil_verificado_email = signInProvider.emailVerified  ? true : false;
        createUserDto.created = signInProvider.created;
        createUserDto.uid = signInProvider.uid;
        createUserDto.nome = signInProvider.name.split(" ")[0];
        createUserDto.sobrenome = signInProvider.name.split(" ")[1];
        
        if(!(await this.usersService.verifyEmailExist(signInProvider.email)) ){
            await this.usersService.createProvider(createUserDto);
        }else if( !(await this.usersService.verifyUidExist(signInProvider.uid)) ){
            await this.usersService.updateUid(signInProvider.email,signInProvider.uid);
        }
        
        const user = await this.usersService.findOneByEmail(signInProvider.email);

        return {
            user,
            access_token: await this.generateJWT(user),
        };

    }

    async reciveConfirmationPassCode(email:string, token_password:string ): Promise<{access_token: string}>{
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
          throw new HttpException('Dados não encontrado', HttpStatus.NOT_FOUND);
        }
    
        if( user.token_senha != token_password){
          throw new HttpException('Código Inválido, tente novamente ou entre em contato com nosso suporte.', HttpStatus.NOT_FOUND);
        }
        user.token_senha = '';
        await this.usersService.update(user.id, user)
    
        const access_token = await this.generateJWT(user);
    
    
        return {access_token: access_token};
      }
}
