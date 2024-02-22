import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { PatientInformation } from './patient_information.entity';
import { PatientInformationService } from './patient_information.service';
import { Query } from '@nestjs/graphql';
import { CreatePatientInformationInput } from './dto/create-patient-information.input';
import { UpdatePatientInformationInput } from './dto/update-patient-information.input';

@Resolver((of) => PatientInformation)
export class PatientInformationResolver {
  constructor(private patientInformationService: PatientInformationService) {}

  // QUERY ALL PATIENT WITH DETAILS
  // query {
  //   getAllPatientsWithDetails {
  //     patientId
  //     firstName
  //     lastName
  //     dateOfBirth
  //     gender
  //     city
  //     state
  //     zip
  //     country
  //     phoneNo
  //     allergies
  //     codeStatus
  //     medications {
  //       medicationNo
  //       medicationDate
  //       comments
  //       medicationStatus
  //     }
  //     vital_signs {
  //       date
  //     bloodPressure
  //     heartRate
  //       temperature
  //       respiratoryRate
  //     }
  //     medical_history {
  //       allergies
  //       medicalConditions
  //       surgeries
  //       familyHistory
  //     }
  //     lab_results{
  //       labResultsNo
  //       date
  //       hemoglobinA1c
  //       fastingBloodGlucose
  //       totalCholesterol
  //       ldlCholesterol
  //       hdlCholesterol
  //       triglycerides
  //     }
  //     notes{
  //       noteNo
  //       date
  //       notes
  //     }
  //     appointment{
  //       appointmentId
  //       dateCreated
  //       appointmentDate
  //       appointmentTime
  //       details
  //       appointmentStatus
  //     }
  //     emergency_contact{
  //       contactId
  //       firstName
  //       lastName
  //       phoneNumber
  //       patientRelationship
  //       city
  //       state
  //       zip
  //       country
  //     }
  //   }
  // }

  @Query(() => [PatientInformation], { name: 'getAllPatientsWithDetails' })
  async getAllPatientsWithDetails(): Promise<PatientInformation[]> {
    return this.patientInformationService.getAllPatientsWithDetails();
  }

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

  @Query((returns) => PatientInformation)
  async getPatientInformation(
    @Args('patientId', { type: () => Int })
    patientId: number,
  ): Promise<PatientInformation> {
    try {
      return this.patientInformationService.getPatientInformationById(
        patientId,
      );
    } catch (error) {
      console.error('Error fetching patient information:', error);
      throw new Error('Failed to fetch patient information');
    }
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

  @Mutation((returns) => PatientInformation)
  async createPatientInformation(
    @Args('createPatientInformationInput')
    createPatientInformationInput: CreatePatientInformationInput,
  ): Promise<PatientInformation> {
    try {
      return this.patientInformationService.createPatientInformation(
        createPatientInformationInput,
      );
    } catch (error) {
      console.error('Error creating patient information:', error);
      throw new Error('Failed to create patient information');
    }
  }

  // UPDATE PATIENT DETAILS
  //
  // mutation {
  //     updatePatientInformation(updatePatientInformationInput: {
  //       patientId: 1,
  //       firstName: "Kent John",
  //       lastName: "Liloc"
  //     }) {
  //       patientId
  //       firstName
  //       lastName
  //       # Include other fields as needed
  //     }
  //   }

  @Mutation(() => PatientInformation)
  async updatePatientInformation(
    @Args('updatePatientInformationInput')
    updatePatientInformationInput: UpdatePatientInformationInput,
  ): Promise<PatientInformation> {
    try {
      return this.patientInformationService.updatePatientInformation(
        updatePatientInformationInput,
      );
    } catch (error) {
      console.error('Error updating patient information:', error);
      throw new Error('Failed to update patient information');
    }
  }
}
