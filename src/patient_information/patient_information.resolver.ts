import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { PatientInformation } from './patient_information.entity';
import { PatientInformationService } from './patient_information.service';
import { Query } from '@nestjs/graphql';
import { CreatePatientInformationInput } from './dto/create-patient-information.input';

@Resolver(of => PatientInformation)
export class PatientInformationResolver {
    constructor(private patientInformationService: PatientInformationService) {}

    // query {
    //     getPatientInformation(patientId: 1) {
    //       patientId
    //       firstName
    //       lastName
    //       dateOfBirth
    //       gender
    //       city
    //       state
    //       zip
    //       country
    //       phoneNo
    //       allergies
    //       codeStatus
    //     }
    //   }

    @Query(returns => PatientInformation)
    getPatientInformation(@Args('patientId', { type: () => Int})
    patientId: number): Promise<PatientInformation>{
        return this.patientInformationService.getPatientInformationById(patientId);
    }

    // mutation {
    //     createPatientInformation(createPatientInformationInput: {
    //       firstName: "John",
    //       lastName: "Doe",
    //       dateOfBirth: "1990-01-01T00:00:00Z",
    //       gender: "Male",
    //       city: "New York",
    //       state: "NY",
    //       zip: "10001",
    //       country: "USA",
    //       phoneNo: "1234567890",
    //       allergies: "None",
    //       codeStatus: "Normal"
    //     }) {
    //       patientId
    //       firstName
    //       lastName
    //       dateOfBirth
    //       gender
    //       city
    //       state
    //       zip
    //       country
    //       phoneNo
    //       allergies
    //       codeStatus
    //     }
    //   }

    @Mutation(returns => PatientInformation)
    async createPatientInformation(
        @Args('createPatientInformationInput') createPatientInformationInput: CreatePatientInformationInput
    ): Promise<PatientInformation> {
        return this.patientInformationService.createPatientInformation(createPatientInformationInput);
    }
}
   