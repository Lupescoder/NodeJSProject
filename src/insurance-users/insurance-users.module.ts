import { Module } from '@nestjs/common';
import { InsuranceUsersService } from './insurance-users.service';
import { InsuranceUsersController } from './insurance-users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsuranceUser } from './entities/insurance-user.entity';
import { UsersModule } from 'src/users/users.module';
import { AppService } from 'src/app.service';
import { InsurancesModule } from 'src/insurances/insurances.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [InsuranceUsersController],
  providers: [InsuranceUsersService, AppService, JwtService, ConfigService],
  imports: [TypeOrmModule.forFeature([InsuranceUser]), UsersModule, InsurancesModule],
  exports: [InsuranceUsersService]
})
export class InsuranceUsersModule {}



