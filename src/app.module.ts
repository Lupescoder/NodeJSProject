import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { EmailService } from './email/email.service';
import { AddressModule } from './address/address.module';
import { Address } from './address/entities/address.entity';
import { MedicalHistoryModule } from './medical-history/medical-history.module';
import { MedicalHistory } from './medical-history/entities/medical-history.entity';
import { MedicationHistoryModule } from './medication-history/medication-history.module';
import { MedicationHistory } from './medication-history/entities/medication-history.entity';
import { InsuranceUsersModule } from './insurance-users/insurance-users.module';
import { InsuranceUser } from './insurance-users/entities/insurance-user.entity';
import { InsurancesModule } from './insurances/insurances.module';
import { Insurance } from './insurances/entities/insurance.entity';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('HOST'),
        port: +configService.get('PORT'),
        username: configService.get('USERNAMEBD'),
        password: configService.get('PASSWORD'),
        database: configService.get('DATABASE'),
        entities: [User, Address, MedicalHistory, MedicationHistory, InsuranceUser, Insurance],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    EmailModule,
    AddressModule,
    MedicalHistoryModule,
    MedicationHistoryModule,
    InsuranceUsersModule,
    InsurancesModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
  exports: [AppService]
})
export class AppModule {}
