import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LabResults } from './lab_results.entity';
import { LabResultsService } from './lab_results.service';
import { CreateLabResultsForPatientInput } from './dto/create-lab-results-for-patient.input';

@Resolver(() => LabResults)
export class LabResultsResolver {
  constructor(private labResultsService: LabResultsService) {}

  @Query(() => [LabResults], { name: 'getPatientLabResults' })
  async getPatientLabResults(
    @Args('patientId', { type: () => Int }) patientId: number,
  ): Promise<LabResults[]> {
    try {
      return this.labResultsService.getPatientLabResults(patientId);
    } catch (error) {
      console.error('Error fetching patient lab results:', error);
      throw new Error('Failed to fetch patient lab results');
    }
  }

  //CREATE LAB RESULTS FOR PATIENT GRAPHQL

  // mutation {
  //   createLabResultsForPatient(createLabResultsForPatientInput: {
  //     patientId: 1
  //     date: "2024-02-21T00:00:00Z"
  //     hemoglobinA1c: "7.2% (within target range)"
  //     fastingBloodGlucose: "120 mg/dL"
  //     totalCholesterol: "180 mg/dL"
  //     ldlCholesterol: "100 mg/dL"
  //     hdlCholesterol: "50 mg/dL"
  //     triglycerides: "150 mg/dL"
  //   }) {
  //     labResultsNo

  //     date
  //     hemoglobinA1c
  //     fastingBloodGlucose
  //     totalCholesterol
  //     ldlCholesterol
  //     hdlCholesterol
  //     triglycerides
  //   }
  // }

  @Mutation(() => LabResults)
  async createLabResultsForPatient(
    @Args('createLabResultsForPatientInput')
    createLabResultsForPatientInput: CreateLabResultsForPatientInput,
  ): Promise<LabResults> {
    return this.labResultsService.createLabResultsForPatient(
      createLabResultsForPatientInput,
    );
  }
}
