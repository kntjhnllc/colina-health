import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medication } from './medication.entity';
import { Repository } from 'typeorm';
import { CreateMedicationForPatientInput } from './dto/create-medication-for-patient.input';
import { PatientInformation } from 'src/patient_information/patient_information.entity';

@Injectable()
export class MedicationService {
    constructor(
        @InjectRepository(Medication) private medicationRepository: Repository<Medication>,
        @InjectRepository(PatientInformation) private patientInformationRepository: Repository<PatientInformation>, // Inject the repository for PatientInformation
    ) {}

    async createMedicationForPatient(createMedicationForPatientInput: CreateMedicationForPatientInput): Promise<Medication> {
        const { patientId, ...medicationData } = createMedicationForPatientInput;

        const medication = new Medication();
        medication.medicationDate = medicationData.medicationDate;
        medication.comments = medicationData.comments;
        medication.medicationStatus = medicationData.medicationStatus;

        // Retrieve the patient information from the database using patientId
        const patient = await this.patientInformationRepository.findOne({where: {patientId}}); // Directly pass patientId as the argument
        if (!patient) {
            throw new Error('Patient not found');
        }

        // Assign the patient information to the medication entity
        medication.patient = patient;

        // Save the medication entity
        return this.medicationRepository.save(medication);
    }

    async getPatientMedication(patientId: number): Promise<Medication[]> {
        // Query the medications associated with the specified patient ID
        return this.medicationRepository.find({
            where: { patient: { patientId } }, // Assuming patientId is a column in the Medication entity
        });
    }
}
