import { Module } from '@nestjs/common';
import { MedicalHistoryService } from './medical_history.service';
import { MedicalHistoryResolver } from './medical_history.resolver';
import { MedicalHistory } from './medical_history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientInformation } from 'src/patient_information/patient_information.entity';

@Module({
  imports:[TypeOrmModule.forFeature([MedicalHistory,PatientInformation])],

  providers: [MedicalHistoryService, MedicalHistoryResolver]
})
export class MedicalHistoryModule {}
