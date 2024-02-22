import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EmergencyContact } from './emergency-contact.entity';
import { EmergencyContactService } from './emergency_contact.service';
import { CreateEmergencyContactForPatientInput } from './dto/create-emergency-contact-for-patient.input';

@Resolver(() => EmergencyContact)
export class EmergencyContactResolver {
  constructor(private emergencyContactService: EmergencyContactService) {}

  //  QUERY EMERGENCY CONTACT BY PATIENT ID

  //   query {
  //     getPatientEmergencyContact(patientId: 1) {
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

  @Query(() => [EmergencyContact], { name: 'getPatientEmergencyContact' })
  async getPatientEmergencyContact(
    @Args('patientId', { type: () => Int }) patientId: number,
  ): Promise<EmergencyContact[]> {
    try {
      return this.emergencyContactService.getPatientEmergencyContact(patientId);
    } catch (error) {
      console.error('Error fetching patient emergency contact:', error);
      throw new Error('Failed to fetch patient emergency contact');
    }
  }

  //CREATE EMERGENCY CONTACT FOR PATIENT

  //   mutation {
  //     createEmergencyContactForPatient(
  //       createEmergencyContactForPatientInput: {
  //         patientId: 1
  //         firstName: "Kevin"
  //         lastName: "Liloc"
  //         phoneNumber: "1234567890"
  //         patientRelationship: "Sibling"
  //         city: "New York"
  //         state: "NY"
  //         zip: "10001"
  //         country: "USA"
  //       }
  //     ) {
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

  @Mutation(() => EmergencyContact)
  async createEmergencyContactForPatient(
    @Args('createEmergencyContactForPatientInput')
    createEmergencyContactForPatientInput: CreateEmergencyContactForPatientInput,
  ): Promise<EmergencyContact> {
    return this.emergencyContactService.createEmergencyContactForPatient(
      createEmergencyContactForPatientInput,
    );
  }
}
