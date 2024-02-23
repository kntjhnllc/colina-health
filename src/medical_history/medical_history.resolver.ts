import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MedicalHistory } from './medical_history.entity';
import { MedicalHistoryService } from './medical_history.service';
import { CreateMedicalHistoryForPatientInput } from './dto/create-medical-history.input';
import { UpdateMedicalHistoryForPatientInput } from './dto/update-medical-history-for-patient.input';

@Resolver(() => MedicalHistory)
export class MedicalHistoryResolver {
  constructor(private medicalHistoryService: MedicalHistoryService) {}

  @Query(() => [MedicalHistory], { name: 'getPatientMedicalHistory' })
  async getPatientMedicalHistory(
    @Args('patientId', { type: () => Int }) patientId: number,
  ): Promise<MedicalHistory[]> {
    try {
      return this.medicalHistoryService.getPatientMedicalHistory(patientId);
    } catch (error) {
      console.error('Error fetching patient medical history:', error);
      throw new Error('Failed to fetch patient medical history');
    }
  }

  @Mutation(() => MedicalHistory)
  async createMedicalHistoryForPatient(
    @Args('createMedicalHistoryForPatientInput')
    createMedicalHistoryForPatientInput: CreateMedicalHistoryForPatientInput,
  ): Promise<MedicalHistory> {
    return this.medicalHistoryService.createMedicalHistoryForPatient(
      createMedicalHistoryForPatientInput,
    );
  }

  // Update Medical History For Patient

  //   mutation {
  //     updateMedicalHistoryForPatient(updateMedicalHistoryForPatientInput: {
  //      patientId: 1,
  //      medicalHistoryNo: 1,
  //       allergies: "Shrimp"
  //     }) {
  //    medicalHistoryNo
  //    allergies
  //     }
  //  }

  @Mutation(() => MedicalHistory)
  async updateMedicalHistoryForPatient(
    @Args('updateMedicalHistoryForPatientInput')
    updateMedicalHistoryForPatientInput: UpdateMedicalHistoryForPatientInput,
  ): Promise<MedicalHistory> {
    try {
      return this.medicalHistoryService.updateMedicalHistoryForPatient(
        updateMedicalHistoryForPatientInput,
      );
    } catch (error) {
      console.error('Error updating medical history:', error);
      throw new Error('Failed to update medical history');
    }
  }
}
