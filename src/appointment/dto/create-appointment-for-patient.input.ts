import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAppointmentForPatientInput {
  @Field()
  patientId: number;

  @Field()
  dateCreated: Date;

  @Field()
  appointmentDate: Date;

  @Field()
  appointmentTime: string;

  @Field()
  details: string;

  @Field()
  appointmentStatus: string;
}
