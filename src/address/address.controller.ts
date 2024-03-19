import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Endereço')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post(':usuario_id')
  create(@Body() createAddressDto: CreateAddressDto, @Param('usuario_id') usuario_id: number): Promise<CreateAddressDto> {
    return this.addressService.create(createAddressDto, usuario_id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto): Promise<UpdateAddressDto> {
    return this.addressService.update(+id, updateAddressDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':usuario_id')
  getAllAddress(@Param('usuario_id') usuario_id: string ): Promise<{ addresses: Address[]}>{
    return this.addressService.findAddressByUser(+usuario_id);
  }

}
