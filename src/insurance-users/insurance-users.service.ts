import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInsuranceUserDto } from './dto/create-insurance-user.dto';
import { UpdateInsuranceUserDto } from './dto/update-insurance-user.dto';
import { InsuranceUser } from './entities/insurance-user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { InsurancesService } from 'src/insurances/insurances.service';
import { AppService } from 'src/app.service';

@Injectable()
export class InsuranceUsersService {
  constructor(
    @InjectRepository(InsuranceUser)
    private readonly insuranceUserRepository:Repository<InsuranceUser>,
    private readonly userService: UsersService,
    private readonly insuranceService: InsurancesService,
    private readonly appService:AppService
  ){}

  async create(createInsuranceUserDto: CreateInsuranceUserDto, usuario_id: number): Promise<CreateInsuranceUserDto> {
    const insuranceUser = this.insuranceUserRepository.create(createInsuranceUserDto); 
    
    await this.userService.findOneById(usuario_id);

    await this.insuranceService.findOne(insuranceUser.convenio_id);

    insuranceUser.dataValidade = this.appService.convertDate(createInsuranceUserDto.dataValidade,'dd/MM/yyyy', 'yyyy-MM-dd');
    insuranceUser.usuario_id = usuario_id;

    try {
      return await this.insuranceUserRepository.save(insuranceUser);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    
  }

  async findAll(usuario_id: number): Promise<{ insuranceUsers: InsuranceUser[] }>  {

    const insuranceUsers = await this.insuranceUserRepository
    .createQueryBuilder('iu')
    .leftJoinAndSelect('iu.insurance', 'insurance')
    .where('iu.usuario_id = :usuario_id', { usuario_id }) //
    .getMany(); 

    
    if (!insuranceUsers) {
      throw new HttpException('Dados não encontrado', HttpStatus.NOT_FOUND);
    }

    insuranceUsers.map(insuranceUser => {
      insuranceUser.dataValidade = this.appService.convertDate(insuranceUser.dataValidade,'yyyy-MM-dd', 'dd/MM/yyyy');
      insuranceUser.qtd = insuranceUsers.length;
    });
    
    return {insuranceUsers };
  }

  async findOne(id: number): Promise<InsuranceUser> {
    const insuranceUser = await this.insuranceUserRepository.findOne({ where: { id } });
    if (!insuranceUser) {
      throw new HttpException('Dado não encontrado', HttpStatus.NOT_FOUND);
    }

    insuranceUser.dataValidade = this.appService.convertDate(insuranceUser.dataValidade,'yyyy-MM-dd', 'dd/MM/yyyy');

    return insuranceUser;
  }

  async update(id: number, updateInsuranceUserDto: UpdateInsuranceUserDto): Promise<UpdateInsuranceUserDto> {
    const insuranceUser = await this.insuranceUserRepository.findOne({ where: { id } });

    if (!insuranceUser) {
      throw new HttpException('Convênio não encontrado', HttpStatus.NOT_FOUND);
    }

    await this.insuranceUserRepository.update(id, updateInsuranceUserDto)

    return updateInsuranceUserDto;
  }

  async remove(id: number): Promise<InsuranceUser> {
    const insuranceUser = await this.insuranceUserRepository.findOne({ where: { id } });
    if (!insuranceUser) {
      throw new HttpException('Convênio não encontrado', HttpStatus.NOT_FOUND);
    }else{
      await this.insuranceUserRepository.remove(insuranceUser);
      return insuranceUser;
    }
  }
}
