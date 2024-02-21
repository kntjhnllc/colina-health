import { Module } from '@nestjs/common';
import { VitalSignsService } from './vital_signs.service';
import { VitalSignsResolver } from './vital_signs.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VitalSigns } from './vital_signs.entity';
import { PatientInformation } from 'src/patient_information/patient_information.entity';

@Module({
  imports:[TypeOrmModule.forFeature([VitalSigns,PatientInformation])],
  providers: [VitalSignsService, VitalSignsResolver]
})
export class VitalSignsModule {}
