import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AppService } from 'src/app.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository:Repository<Address>,
    private	 readonly userService: UsersService,
    private readonly appService: AppService){}


  async create(createAddressDto: CreateAddressDto, usuario_id): Promise<CreateAddressDto> {
    const address = this.addressRepository.create(createAddressDto);
     
    await this.userService.findOneById(usuario_id);

    address.usuario_id = usuario_id;
    address.cep = this.appService.formatOnlyNumber(createAddressDto.cep);
    if(await this.canCreateAnotherAddress(address.usuario_id)){
      return await this.addressRepository.save(address);
    }else{
      throw new HttpException('Usuário é um paciente e não pode ter mais de um endereço', HttpStatus.NOT_ACCEPTABLE);
    }
    
  }

  async canCreateAnotherAddress(usuario_id: number): Promise<Boolean>{
    const existAddress = await this.addressRepository.findOne({ where: { usuario_id } });
    if(existAddress){
      const user = await this.userService.findOneById(usuario_id);
      if(user.is_medico){
        return true;
      }else{
        return false;
      }
    }else{
      return true;
    }
  }

  async findAddressByUser(usuario_id: number): Promise<{ addresses: Address[]}> {
    const addresses = await this.addressRepository.find({ where: { usuario_id } });
    addresses.map(address => {
      address.cep = this.appService.returnFormatCep(address.cep);
    });
    return { addresses };
  }

  async update(id: number, updateAddressDto: UpdateAddressDto): Promise<UpdateAddressDto> {
    const address = await this.addressRepository.findOne({ where: { id } });
    if (!address) {
      throw new HttpException('Endereço não encontrado', HttpStatus.NOT_FOUND);
    }
    updateAddressDto.cep = this.appService.formatOnlyNumber(updateAddressDto.cep);
    await this.addressRepository.update(id, updateAddressDto)
    return updateAddressDto;
  }

}
