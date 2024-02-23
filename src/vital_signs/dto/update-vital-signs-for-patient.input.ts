import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateVitalSignsForPatientInput {
  @Field()
  patientId: number;

  @Field()
  vitalSignsNo: number;

  @Field({ nullable: true })
  date?: Date;

  @Field({ nullable: true })
  bloodPressure?: string;

  @Field({ nullable: true })
  heartRate?: string;

  @Field({ nullable: true })
  temperature?: string;

  @Field({ nullable: true })
  respiratoryRate?: string;
}
