import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { AddressModule } from 'src/address/address.module';
import { MedicalHistoryModule } from 'src/medical-history/medical-history.module';
import { MedicationHistoryModule } from 'src/medication-history/medication-history.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ConfigService],
  exports: [AuthService],
  imports: [
    UsersModule, 
    AddressModule,
    MedicalHistoryModule,
    MedicationHistoryModule,
    ConfigModule 
  ]
})
export class AuthModule {}
