import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateLabResultsForPatientInput {
  @Field()
  patientId: number;

  @Field()
  labResultsNo: number;

  @Field({ nullable: true })
  date?: Date;

  @Field({ nullable: true })
  hemoglobinA1C?: string;

  @Field({ nullable: true })
  fastingBloodGlucose?: string;

  @Field({ nullable: true })
  totalCholesterol?: string;

  @Field({ nullable: true })
  ldlCholesterol?: string;

  @Field({ nullable: true })
  hdlCholesterol?: string;

  @Field({ nullable: true })
  triglycerides?: string;
}
