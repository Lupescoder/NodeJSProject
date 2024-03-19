import { Module } from '@nestjs/common';
import { MedicalHistoryService } from './medical-history.service';
import { MedicalHistoryController } from './medical-history.controller';
import { MedicalHistory } from './entities/medical-history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from 'src/app.service';
import { UsersModule } from 'src/users/users.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [MedicalHistoryController],
  providers: [MedicalHistoryService, AppService, JwtService, ConfigService],
  imports: [TypeOrmModule.forFeature([MedicalHistory]), UsersModule],
  exports: [MedicalHistoryService]
})
export class MedicalHistoryModule {}
