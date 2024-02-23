import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateNotesForPatientInput {
  @Field()
  patientId: number;

  @Field()
  noteNo: number;

  @Field({ nullable: true })
  date?: Date;

  @Field({ nullable: true })
  notes?: string;
}
