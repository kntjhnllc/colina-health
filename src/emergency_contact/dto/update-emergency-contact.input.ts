import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateEmergencyContactForPatientInput {
  @Field()
  patientId: number;

  @Field()
  contactId: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  patientRelationship?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  state?: string;

  @Field({ nullable: true })
  zip?: string;

  @Field({ nullable: true })
  country?: string;
}
