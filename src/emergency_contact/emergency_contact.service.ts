import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmergencyContact } from './emergency-contact.entity';
import { Repository } from 'typeorm';
import { PatientInformation } from 'src/patient_information/patient_information.entity';
import { CreateEmergencyContactForPatientInput } from './dto/create-emergency-contact-for-patient.input';

@Injectable()
export class EmergencyContactService {
  constructor(
    @InjectRepository(EmergencyContact)
    private emergencyContactRepository: Repository<EmergencyContact>,
    @InjectRepository(PatientInformation)
    private patientInformationRepository: Repository<PatientInformation>,
  ) {}

  async createEmergencyContactForPatient(
    createEmergencyContactForPatientInput: CreateEmergencyContactForPatientInput,
  ): Promise<EmergencyContact> {
    const { patientId, ...emergencyContactData } =
      createEmergencyContactForPatientInput;

    const emergency_contact = new EmergencyContact();
    emergency_contact.firstName = emergencyContactData.firstName;
    emergency_contact.lastName = emergencyContactData.lastName;
    emergency_contact.phoneNumber = emergencyContactData.phoneNumber;
    emergency_contact.patientRelationship =
      emergencyContactData.patientRelationship;
    emergency_contact.city = emergencyContactData.city;
    emergency_contact.state = emergencyContactData.state;
    emergency_contact.zip = emergencyContactData.zip;
    emergency_contact.country = emergencyContactData.country;

    const patient = await this.patientInformationRepository.findOne({
      where: {
        patientId,
      },
    });

    if (!patient) {
      throw new Error('Patient not found!');
    }

    emergency_contact.patient = patient;

    return this.emergencyContactRepository.save(emergency_contact);
  }

  async getPatientEmergencyContact(
    patientId: number,
  ): Promise<EmergencyContact[]> {
    return this.emergencyContactRepository.find({
      where: {
        patient: {
          patientId,
        },
      },
    });
  }
}
