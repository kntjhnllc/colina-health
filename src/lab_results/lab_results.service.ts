import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LabResults } from './lab_results.entity';
import { Repository } from 'typeorm';
import { PatientInformation } from 'src/patient_information/patient_information.entity';
import { CreateLabResultsForPatientInput } from './dto/create-lab-results-for-patient.input';

@Injectable()
export class LabResultsService {
  constructor(
    @InjectRepository(LabResults)
    private labResultsRepository: Repository<LabResults>,
    @InjectRepository(PatientInformation)
    private patientInformationRepository: Repository<PatientInformation>,
  ) {}

  async createLabResultsForPatient(
    createLabResultsForPatientInput: CreateLabResultsForPatientInput,
  ): Promise<LabResults> {
    const { patientId, ...labResultsData } = createLabResultsForPatientInput;

    const lab_results = new LabResults();
    lab_results.date = labResultsData.date;
    lab_results.hemoglobinA1c = labResultsData.hemoglobinA1c;
    lab_results.fastingBloodGlucose = labResultsData.fastingBloodGlucose;
    lab_results.totalCholesterol = labResultsData.totalCholesterol;
    lab_results.ldlCholesterol = labResultsData.ldlCholesterol;
    lab_results.hdlCholesterol = labResultsData.hdlCholesterol;
    lab_results.triglycerides = labResultsData.triglycerides;

    const patient = await this.patientInformationRepository.findOne({
      where: { patientId },
    });

    if (!patient) {
      throw new Error('Patient not found!');
    }

    lab_results.patient = patient;

    return this.labResultsRepository.save(lab_results);
  }

  async getPatientLabResults(patientId: number): Promise<LabResults[]> {
    return this.labResultsRepository.find({
      where: { patient: { patientId } },
    });
  }
}
