import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MedicalHistory } from './medical_history.entity';
import { MedicalHistoryService } from './medical_history.service';
import {CreateMedicalHistoryForPatientInput} from './dto/create-medical-history.input';

@Resolver(() => MedicalHistory)
export class MedicalHistoryResolver {
    constructor (private medicalHistoryService: MedicalHistoryService) {}

    @Query(() => [MedicalHistory], {name: "getPatientMedicalHistory"})
    async getPatientMedicalHistory(@Args('patientId', {type: () => Int}) patientId: number): Promise<MedicalHistory[]>{
        try {
            return this.medicalHistoryService.getPatientMedicalHistory(patientId);
        } catch (error) {
            console.error('Error fetching patient medical history:', error);
            throw new Error('Failed to fetch patient medical history');
        }
    }

    @Mutation(() => MedicalHistory)
    async createMedicalHistoryForPatient(
        @Args('createMedicalHistoryForPatientInput') createMedicalHistoryForPatientInput: CreateMedicalHistoryForPatientInput,
    ): Promise<MedicalHistory> {
        return this.medicalHistoryService.createMedicalHistoryForPatient(createMedicalHistoryForPatientInput);
    }
}
