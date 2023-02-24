import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalTestDto } from './create-medical-test.dto';

export class UpdateMedicalTestDto extends PartialType(CreateMedicalTestDto) {}
