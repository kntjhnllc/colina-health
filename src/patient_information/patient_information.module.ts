import { Module } from '@nestjs/common';
import { PatientInformationService } from './patient_information.service';
import { PatientInformationResolver } from './patient_information.resolver';
import { PatientInformation } from './patient_information.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medication } from 'src/medication/medication.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatientInformation,Medication])],
  providers: [PatientInformationService, PatientInformationResolver]
})
export class PatientInformationModule {}
 