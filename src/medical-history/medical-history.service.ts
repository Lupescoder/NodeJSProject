import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';
import { UpdateMedicalHistoryDto } from './dto/update-medical-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalHistory } from './entities/medical-history.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MedicalHistoryService {

  constructor(
    @InjectRepository(MedicalHistory)
    private readonly medicalHostoryRepository:Repository<MedicalHistory>,
    private readonly userService: UsersService
  ){}

  async create(createMedicalHistoryDto: CreateMedicalHistoryDto, usuario_id: number): Promise<CreateMedicalHistoryDto> {
    const medicalHistory = this.medicalHostoryRepository.create(createMedicalHistoryDto); 

    await this.userService.findOneById(usuario_id);

    medicalHistory.usuario_id = usuario_id;
    try {
      return await this.medicalHostoryRepository.save(medicalHistory);
    } catch (error) {
      throw new HttpException('Chave única duplicada', HttpStatus.CONFLICT);
    }
  }

  async findOne(usuario_id: number): Promise<MedicalHistory> {
    const medicalHistory = await this.medicalHostoryRepository.findOne({ where: { usuario_id } });
    return medicalHistory;
  }

  async update(id: number, updateMedicalHistoryDto: UpdateMedicalHistoryDto): Promise<UpdateMedicalHistoryDto> {
    const medicalHistory = await this.medicalHostoryRepository.findOne({ where: { id } });
    if (!medicalHistory) {
      throw new HttpException('Historico Médico não encontrado', HttpStatus.NOT_FOUND);
    }
    await this.medicalHostoryRepository.update(id, updateMedicalHistoryDto)
    return updateMedicalHistoryDto;
  }

}
