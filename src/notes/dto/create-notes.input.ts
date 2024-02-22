import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNotesForPatientInput {
  @Field()
  patientId: number;

  @Field()
  date: Date;

  @Field()
  notes: string;
}
