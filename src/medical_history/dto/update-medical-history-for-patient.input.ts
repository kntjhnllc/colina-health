import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateMedicalHistoryForPatientInput {
  @Field()
  patientId: number;

  @Field()
  medicalHistoryNo: number;

  @Field({ nullable: true })
  allergies?: string;

  @Field({ nullable: true })
  medicalConditions?: string;

  @Field({ nullable: true })
  surgeries?: string;

  @Field({ nullable: true })
  familyHistory?: string;
}
