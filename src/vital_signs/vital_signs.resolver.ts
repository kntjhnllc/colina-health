import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { VitalSigns } from './vital_signs.entity';
import { VitalSignsService } from './vital_signs.service';
import { Query } from '@nestjs/graphql';
import { createVitalSignsForPatientInput } from './dto/create-vital-signs-for-patient.input';

@Resolver(() => VitalSigns)
export class VitalSignsResolver {
    constructor(private vitalSignsService: VitalSignsService) {}


    // query {
    //     getPatientVitalSigns(patientId: 1) {
    //       date
    //       bloodPressure
    //       heartRate
    //       temperature
    //       respiratoryRate
    //     }
    //   }

    @Query(() => [VitalSigns], { name: 'getPatientVitalSigns' })
    async getPatientVitalSigns(
        @Args('patientId', { type: () => Int }) patientId: number
    ): Promise<VitalSigns[]> {
        try {
            return await this.vitalSignsService.getPatientVitalSigns(patientId);
        } catch (error) {
            // Handle errors appropriately (e.g., log the error, return a default value, etc.)
            console.error('Error fetching patient vital signs:', error);
            throw new Error('Failed to fetch patient vital signs');
        }
    }

    // mutation {
    //     createVitalSignsForPatient(createVitalSignsForPatientInput: {
    //       patientId: 1, 
    //       date: "2024-02-21T12:00:00Z",
    //       bloodPressure: "120/80",
    //       heartRate: "80", 
    //       temperature: "98.6",
    //       respiratoryRate: "16" 
    //     }) {
    //       date
    //       bloodPressure
    //       heartRate
    //       temperature
    //       respiratoryRate
    //     }
    //   }

    @Mutation(() => VitalSigns)
    async createVitalSignsForPatient(
        @Args('createVitalSignsForPatientInput') createVitalSignsForPatientInput:createVitalSignsForPatientInput,
    ): Promise<VitalSigns> {
        try {
            return this.vitalSignsService.createVitalSignsForPatient(createVitalSignsForPatientInput);
        } catch (error) {
            console.error('Error creating vital signs for patient:', error);
            throw new Error('Failed to create vital signs for patient');
        }
    }
}
