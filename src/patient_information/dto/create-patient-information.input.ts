import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreatePatientInformationInput{

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    dateOfBirth: Date;

    @Field()
    gender: string;

    @Field()
    city: string;

    @Field()
    state: string;

    @Field()
    zip: string;

    @Field()
    country: string;

    @Field()
    phoneNo: string;

    @Field()
    allergies: string;
    
    @Field()
    codeStatus: string;

}