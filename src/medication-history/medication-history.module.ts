import { Module } from '@nestjs/common';
import { MedicationHistoryService } from './medication-history.service';
import { MedicationHistoryController } from './medication-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { MedicationHistory } from './entities/medication-history.entity';
import { AppService } from 'src/app.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Module({
  controllers: [MedicationHistoryController],
  providers: [MedicationHistoryService, AppService, JwtService, ConfigService],
  imports: [TypeOrmModule.forFeature([MedicationHistory]), UsersModule],
  exports: [MedicationHistoryService]
})
export class MedicationHistoryModule {}
