import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientInformation } from './patient_information.entity';
import { Repository } from 'typeorm';
import { CreatePatientInformationInput } from './dto/create-patient-information.input';
import { UpdatePatientInformationInput } from './dto/update-patient-information.input';

@Injectable()
export class PatientInformationService {
  constructor(
    @InjectRepository(PatientInformation)
    private patientInformationRepository: Repository<PatientInformation>,
  ) {}

  async getAllPatientsWithDetails(): Promise<PatientInformation[]> {
    return this.patientInformationRepository.find({
      relations: [
        'medications',
        'vital_signs',
        'medical_history',
        'lab_results',
        'notes',
        'appointment',
        'emergency_contact',
      ],
    });
  }
  // test
  async createPatientInformation(
    createPatientInformationInput: CreatePatientInformationInput,
  ): Promise<PatientInformation> {
    const newPatientInformation = this.patientInformationRepository.create(
      createPatientInformationInput,
    );

    return this.patientInformationRepository.save(newPatientInformation);
  }

  async getPatientInformationById(
    patientId: number,
  ): Promise<PatientInformation> {
    return this.patientInformationRepository.findOneOrFail({
      where: { patientId },
    });
  }

  //Update Personal Information

  async updatePatientInformation(
    updatePatientInformationInput: UpdatePatientInformationInput,
  ): Promise<PatientInformation> {
    const { patientId, ...updateData } = updatePatientInformationInput;

    // Find the patient record by ID
    const patient = await this.patientInformationRepository.findOneOrFail({
      where: { patientId },
    });

    // Update the patient record with the new data
    Object.assign(patient, updateData);

    // Save the updated patient record
    return this.patientInformationRepository.save(patient);
  }
}
