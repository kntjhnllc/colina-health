import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Appointment } from './appointment.entity';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentForPatientInput } from './dto/create-appointment-for-patient.input';
import { UpdateAppointmentForPatientInput } from './dto/update-appointment-for-patient.input';

@Resolver(() => Appointment)
export class AppointmentResolver {
  constructor(private appointmentService: AppointmentService) {}

  //   query {
  //     getPatientAppointment(patientId:1){
  //           appointmentId
  //       dateCreated
  //       appointmentDate
  //       appointmentTime
  //       details
  //       appointmentStatus
  //     }
  //   }

  @Query(() => [Appointment], { name: 'getPatientAppointment' })
  async getPatientAppointment(
    @Args('patientId', { type: () => Int }) patientId: number,
  ): Promise<Appointment[]> {
    try {
      return this.appointmentService.getPatientAppointment(patientId);
    } catch (error) {
      console.error('Error fetching patient appointment:', error);
      throw new Error('Failed to fetch patient appointment');
    }
  }

  //   mutation {
  //     createAppointmentForPatient(
  //       createAppointmentForPatientInput: {
  //         patientId: 1
  //         dateCreated: "2024-02-23T10:00:00.000Z"
  //         appointmentDate: "2024-03-01"
  //         appointmentTime: "10:00:00"
  //         details: "Follow-up appointment"
  //         appointmentStatus: "Scheduled"
  //       }
  //     ) {
  //       dateCreated
  //       appointmentDate
  //       appointmentTime
  //       details
  //       appointmentStatus
  //     }
  //   }

  @Mutation(() => Appointment)
  async createAppointmentForPatient(
    @Args('createAppointmentForPatientInput')
    createAppointmentForPatientInput: CreateAppointmentForPatientInput,
  ): Promise<Appointment> {
    return this.appointmentService.createAppointmentForPatient(
      createAppointmentForPatientInput,
    );
  }

  // UPDATE APPOINTMENT FOR PATIENT

  // mutation {
  //   updateAppointmentForPatient(updateAppointmentForPatientInput: {
  //    patientId: 1,
  //    appointmentId: 1,
  //     details: "try updating"
  //   }) {
  //  appointmentId
  //     details
  //   }
  // }

  @Mutation(() => Appointment)
  async updateAppointmentForPatient(
    @Args('updateAppointmentForPatientInput')
    updateAppointmentForPatientInput: UpdateAppointmentForPatientInput,
  ): Promise<Appointment> {
    try {
      return this.appointmentService.updateAppointmentForPatient(
        updateAppointmentForPatientInput,
      );
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw new Error('Failed to update appointment');
    }
  }
}
