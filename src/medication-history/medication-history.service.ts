import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMedicationHistoryDto } from './dto/create-medication-history.dto';
import { UpdateMedicationHistoryDto } from './dto/update-medication-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicationHistory } from './entities/medication-history.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MedicationHistoryService {
  constructor(
    @InjectRepository(MedicationHistory)
    private readonly medicationHistoryRepository:Repository<MedicationHistory>,
    private readonly userService: UsersService
  ){}


  async create(createMedicationHistoryDto: CreateMedicationHistoryDto, usuario_id): Promise<CreateMedicationHistoryDto> {
    const medicationHistory = this.medicationHistoryRepository.create(createMedicationHistoryDto); 
    
    await this.userService.findOneById(usuario_id);

    medicationHistory.usuario_id = usuario_id;
    try {
      return await this.medicationHistoryRepository.save(medicationHistory);
    } catch (error) {
      throw new HttpException('Chave única duplicada', HttpStatus.CONFLICT);
    }
    
  }

  async findOne(usuario_id: number): Promise<MedicationHistory> {
    const medicationHistory = await this.medicationHistoryRepository.findOne({ where: { usuario_id } });
    return medicationHistory;
  }

  async update(id: number, updateMedicationHistoryDto: UpdateMedicationHistoryDto): Promise<UpdateMedicationHistoryDto> {
    const medicationHistory = await this.medicationHistoryRepository.findOne({ where: { id } });
    if (!medicationHistory) {
      throw new HttpException('Historico de Medicamento não encontrado', HttpStatus.NOT_FOUND);
    }
    await this.medicationHistoryRepository.update(id, updateMedicationHistoryDto)
    return updateMedicationHistoryDto;
  }

}
