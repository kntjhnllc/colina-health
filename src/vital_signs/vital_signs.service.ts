import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VitalSigns } from './vital_signs.entity';
import { Repository } from 'typeorm';
import { PatientInformation } from 'src/patient_information/patient_information.entity';
import { CreateVitalSignsForPatientInput } from './dto/create-vital-signs-for-patient.input';
import { UpdateVitalSignsForPatientInput } from './dto/update-vital-signs-for-patient.input';

@Injectable()
export class VitalSignsService {
  constructor(
    @InjectRepository(VitalSigns)
    private vitalSignsRepository: Repository<VitalSigns>,
    @InjectRepository(PatientInformation)
    private patientInformationRepository: Repository<PatientInformation>,
  ) {}

  async createVitalSignsForPatient(
    createVitalSignsForPatientInput: CreateVitalSignsForPatientInput,
  ): Promise<VitalSigns> {
    const { patientId, ...vitalSignsData } = createVitalSignsForPatientInput;

    const vital_sign = new VitalSigns();
    vital_sign.date = vitalSignsData.date;
    vital_sign.bloodPressure = vitalSignsData.bloodPressure;
    vital_sign.heartRate = vitalSignsData.heartRate;
    vital_sign.temperature = vitalSignsData.temperature;
    vital_sign.respiratoryRate = vitalSignsData.respiratoryRate;

    const patient = await this.patientInformationRepository.findOne({
      where: { patientId },
    });

    if (!patient) {
      throw new Error('Patient not Found');
    }

    vital_sign.patient = patient;

    return this.vitalSignsRepository.save(vital_sign);
  }

  async getPatientVitalSigns(patientId: number): Promise<VitalSigns[]> {
    return this.vitalSignsRepository.find({
      where: {
        patient: {
          patientId,
        },
      },
    });
  }

  //Update Vital Signs for Patient

  async updateVitalSignsForPatient(
    updateVitalSignsForPatientInput: UpdateVitalSignsForPatientInput,
  ): Promise<VitalSigns> {
    const { vitalSignsNo, ...updateData } = updateVitalSignsForPatientInput;

    const vital_signs = await this.vitalSignsRepository.findOneOrFail({
      where: { vitalSignsNo },
    });

    Object.assign(vital_signs, updateData);

    return this.vitalSignsRepository.save(vital_signs);
  }
}
