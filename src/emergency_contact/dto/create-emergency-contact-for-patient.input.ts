import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateEmergencyContactForPatientInput {
  @Field()
  patientId: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  phoneNumber: string;

  @Field()
  patientRelationship: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  zip: string;

  @Field()
  country: string;
}
