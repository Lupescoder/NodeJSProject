import { PartialType } from '@nestjs/swagger';
import { CreateInsuranceUserDto } from './create-insurance-user.dto';

export class UpdateInsuranceUserDto extends PartialType(CreateInsuranceUserDto) {}
