import { Field, InputType, Int } from "@nestjs/graphql";


@InputType()
export class UpdatePatientInformationInput{

    @Field(() => Int)
    patientId: number;

    @Field({ nullable: true }) // Making firstName nullable
    firstName?: string;

    @Field({ nullable: true }) // Making lastName nullable
    lastName?: string;

    @Field({ nullable: true }) // Making dateOfBirth nullable
    dateOfBirth?: Date;

    @Field({ nullable: true }) // Making gender nullable
    gender?: string;

    @Field({ nullable: true }) // Making city nullable
    city?: string;

    @Field({ nullable: true }) // Making state nullable
    state?: string;

    @Field({ nullable: true }) // Making zip nullable
    zip?: string;

    @Field({ nullable: true }) // Making country nullable
    country?: string;

    @Field({ nullable: true }) // Making phoneNo nullable
    phoneNo?: string;

    @Field({ nullable: true }) // Making allergies nullable
    allergies?: string;
    
    @Field({ nullable: true }) // Making codeStatus nullable
    codeStatus?: string;
}   
