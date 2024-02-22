import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalHistory } from './medical_history.entity';
import { Repository } from 'typeorm';
import { PatientInformation } from 'src/patient_information/patient_information.entity';
import { CreateMedicalHistoryForPatientInput } from './dto/create-medical-history.input';

@Injectable()
export class MedicalHistoryService {
  constructor(
    @InjectRepository(MedicalHistory)
    private medicalHistoryRepository: Repository<MedicalHistory>,
    @InjectRepository(PatientInformation)
    private patientInformationRepository: Repository<PatientInformation>,
  ) {}

  async createMedicalHistoryForPatient(
    createMedicalHistoryForPatientInput: CreateMedicalHistoryForPatientInput,
  ): Promise<MedicalHistory> {
    const { patientId, ...medicalHistoryData } =
      createMedicalHistoryForPatientInput;

    const medical_history = new MedicalHistory();
    medical_history.allergies = medicalHistoryData.allergies;
    medical_history.medicalConditions = medicalHistoryData.medicalCondition;
    medical_history.surgeries = medicalHistoryData.surgeries;
    medical_history.familyHistory = medicalHistoryData.familyHistory;

    const patient = await this.patientInformationRepository.findOne({
      where: { patientId },
    });

    if (!patient) {
      throw new Error('Patient not found!');
    }

    medical_history.patient = patient;

    return this.medicalHistoryRepository.save(medical_history);
  }

  async getPatientMedicalHistory(patientId: number): Promise<MedicalHistory[]> {
    return this.medicalHistoryRepository.find({
      where: { patient: { patientId } },
    });
  }
}
