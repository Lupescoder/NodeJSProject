import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MedicalHistoryService } from './medical-history.service';
import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';
import { UpdateMedicalHistoryDto } from './dto/update-medical-history.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { MedicalHistory } from './entities/medical-history.entity';

@ApiTags('Historico Médico')
@Controller('medical-history')
export class MedicalHistoryController {
  constructor(private readonly medicalHistoryService: MedicalHistoryService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post(':usuario_id')
  create(@Body() createMedicalHistoryDto: CreateMedicalHistoryDto, @Param('usuario_id') usuario_id: number): Promise<CreateMedicalHistoryDto> {
    return this.medicalHistoryService.create(createMedicalHistoryDto,usuario_id);
  }

  
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicalHistoryDto: UpdateMedicalHistoryDto): Promise<UpdateMedicalHistoryDto> {
    return this.medicalHistoryService.update(+id, updateMedicalHistoryDto);
  }

  
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':usuario_id')
  getMedicalHistory(@Param('usuario_id') usuario_id: string ): Promise<MedicalHistory>{
    return this.medicalHistoryService.findOne(+usuario_id);
  }

}
