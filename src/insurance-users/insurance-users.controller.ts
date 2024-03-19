import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InsuranceUsersService } from './insurance-users.service';
import { CreateInsuranceUserDto } from './dto/create-insurance-user.dto';
import { UpdateInsuranceUserDto } from './dto/update-insurance-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { InsuranceUser } from './entities/insurance-user.entity';

@ApiTags('Convênios Usuários')
@Controller('insurance-users')
export class InsuranceUsersController {
  constructor(private readonly insuranceUsersService: InsuranceUsersService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post(':usuario_id')
  create(@Body() createInsuranceUserDto: CreateInsuranceUserDto, @Param('usuario_id') usuario_id: number): Promise<CreateInsuranceUserDto> {
    return this.insuranceUsersService.create(createInsuranceUserDto, usuario_id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':usuario_id')
  findAll(@Param('usuario_id') usuario_id: number): Promise<{ insuranceUsers: InsuranceUser[] }> {
    return this.insuranceUsersService.findAll(usuario_id);
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInsuranceUserDto: UpdateInsuranceUserDto): Promise<UpdateInsuranceUserDto> {
    return this.insuranceUsersService.update(+id, updateInsuranceUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<InsuranceUser> {
    return this.insuranceUsersService.remove(+id);
  }
}
