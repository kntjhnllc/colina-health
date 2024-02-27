import { Controller, Get, Param, Query } from '@nestjs/common';
import { PatientInformationService } from './patient_information.service';

@Controller('patient-information')
export class PatientInformationController {
  constructor(private readonly patientService: PatientInformationService) {}

  @Get()
  async getAllPatients() {
    return this.patientService.getAllPatients();
  }
  @Get('')
  async getAllPatientsWithDetails() {
    return this.patientService.getAllPatientsWithDetails();
  }

  @Get('')
  async getPatientById(@Query('patientId') patientId: number) {
    return this.patientService.getPatientInformationById(patientId);
  }
}
