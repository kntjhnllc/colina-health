import { Module } from '@nestjs/common';
import { MedicationService } from './medication.service';
import { MedicationResolver } from './medication.resolver';
import { Medication } from './medication.entity';
import { PatientInformation } from 'src/patient_information/patient_information.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Medication,PatientInformation])],
  providers: [MedicationService, MedicationResolver]
})
export class MedicationModule {}
