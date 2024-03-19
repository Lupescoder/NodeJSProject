import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Insurance } from './entities/insurance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InsurancesService {

  constructor(
    @InjectRepository(Insurance)
    private readonly insuranceRepository:Repository<Insurance>
  ){}

  async findAll(): Promise<Insurance[]>{
    const insurance = await this.insuranceRepository.find();
    insurance.map(insurance => insurance);
    
    return insurance;
  }

  async findOne(id: number): Promise<Insurance> {
    const insurance = await this.insuranceRepository.findOne({ where: { id } });
    if(!insurance){
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    return insurance;
  }


  async findByName(name: string): Promise<Insurance[]> {
  
    const insurances = await this.insuranceRepository
      .createQueryBuilder('insurance')
      .where('insurance.nome LIKE :name', { name: `%${name}%` })
      .getMany();

    if (insurances.length === 0) {
      throw new HttpException('Nenhum convênio encontrado', HttpStatus.NOT_FOUND);
    }

    return insurances;
  }

}
