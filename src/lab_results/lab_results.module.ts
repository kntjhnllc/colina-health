import { Module } from '@nestjs/common';
import { LabResultsService } from './lab_results.service';
import { LabResultsResolver } from './lab_results.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabResults } from './lab_results.entity';
import { PatientInformation } from 'src/patient_information/patient_information.entity';

@Module({
  imports:[TypeOrmModule.forFeature([LabResults,PatientInformation])],
  providers: [LabResultsService, LabResultsResolver]
})
export class LabResultsModule {}
