import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateAppointmentForPatientInput {
  @Field()
  patientId: number;

  @Field()
  appointmentId: number;

  @Field({ nullable: true })
  dateCreated?: Date;

  @Field({ nullable: true })
  appointmentDate?: Date;

  @Field({ nullable: true })
  appointmentTime?: string;

  @Field({ nullable: true })
  details?: string;

  @Field({ nullable: true })
  appointmentStatus?: string;
}
