import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientInformation } from './patient_information.entity';
import { Repository } from 'typeorm';
import { CreatePatientInformationInput } from './dto/create-patient-information.input';

@Injectable()
export class PatientInformationService {
    constructor(@InjectRepository(PatientInformation) private patientInformationRepository: Repository<PatientInformation>) {}

    createPatientInformation(createPatientInformationInput: CreatePatientInformationInput): Promise<PatientInformation>{
        const newPatientInformation = this.patientInformationRepository.create(createPatientInformationInput);

        return this.patientInformationRepository.save(newPatientInformation);
    }

    getPatientInformationById(patientId: number): Promise<PatientInformation> {
        return this.patientInformationRepository.findOneOrFail({
            where: { patientId }
        })
    }

    

}
