import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { Medication } from './medication.entity';
import { MedicationService } from './medication.service';
import { Query } from '@nestjs/graphql';
import { createMedicationForPatientInput } from './dto/create-medication-for-patient.input';

@Resolver(() => Medication)
export class MedicationResolver {
    constructor(private medicationService: MedicationService) {}


    // query {
    //     getPatientMedication(patientId: 1) {
    //       medicationNo
    //       medicationDate
    //       comments
    //       medicationStatus
    //     }
    //   }

    @Query(() => [Medication], {name: 'getPatientMedication'})
    async getPatientMedication(@Args('patientId', { type: () => Int}) patientId: number): Promise<Medication[]>{
        try {
            return this.medicationService.getPatientMedication(patientId);
        } catch (error) {
            console.error('Error fetching patient medication:', error);
            throw new Error('Failed to fetch patient medication');
        }
    }


    // mutation {
    //     createMedicationForPatient(createMedicationForPatientInput: {
    //       patientId: 1, 
    //       medicationDate: "2024-02-21T12:00:00Z", 
    //       comments: "Take one tablet daily with meals",
    //       medicationStatus: "Active" 
    //     }) {
    //       medicationNo 
    //       comments
    //       medicationStatus
    //     }
    //   }

    @Mutation(() => Medication)
    async createMedicationForPatient(
        @Args('createMedicationForPatientInput') createMedicationForPatientInput: createMedicationForPatientInput,
    ): Promise<Medication> {
        return this.medicationService.createMedicationForPatient(createMedicationForPatientInput);
    }
}
