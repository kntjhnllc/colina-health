import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateLabResultsForPatientInput {
  @Field(() => Int)
  patientId: number;

  @Field()
  date: Date;

  @Field()
  hemoglobinA1c: string;

  @Field()
  fastingBloodGlucose: string;

  @Field()
  totalCholesterol: string;

  @Field()
  ldlCholesterol: string;

  @Field()
  hdlCholesterol: string;

  @Field()
  triglycerides: string;
}
