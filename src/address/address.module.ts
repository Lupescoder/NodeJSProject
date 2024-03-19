import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { UsersModule } from 'src/users/users.module';
import { AppService } from 'src/app.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AddressController],
  providers: [AddressService, AppService, JwtService, ConfigService],
  imports: [TypeOrmModule.forFeature([Address]), UsersModule],
  exports: [AddressService]
})
export class AddressModule {}

