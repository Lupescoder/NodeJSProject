import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MedicationHistoryService } from './medication-history.service';
import { CreateMedicationHistoryDto } from './dto/create-medication-history.dto';
import { UpdateMedicationHistoryDto } from './dto/update-medication-history.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Histórico Medicamentos')
@Controller('medication-history')
export class MedicationHistoryController {
  constructor(private readonly medicationHistoryService: MedicationHistoryService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post(':usuario_id')
  create(@Body() createMedicationHistoryDto: CreateMedicationHistoryDto, @Param('usuario_id') usuario_id: number) {
    return this.medicationHistoryService.create(createMedicationHistoryDto, usuario_id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':usuario_id')
  findOne(@Param('usuario_id') usuario_id: string) {
    return this.medicationHistoryService.findOne(+usuario_id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicationHistoryDto: UpdateMedicationHistoryDto) {
    return this.medicationHistoryService.update(+id, updateMedicationHistoryDto);
  }
}
