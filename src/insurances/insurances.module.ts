import { Module } from '@nestjs/common';
import { InsurancesService } from './insurances.service';
import { InsurancesController } from './insurances.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Insurance } from './entities/insurance.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [InsurancesController],
  providers: [InsurancesService, JwtService, ConfigService],
  imports: [TypeOrmModule.forFeature([Insurance])],
  exports: [InsurancesService]
})
export class InsurancesModule {}



 