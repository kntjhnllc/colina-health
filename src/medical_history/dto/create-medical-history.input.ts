import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateMedicalHistoryForPatientInput{

    @Field(() => Int)
    patientId: number;

    @Field()
    allergies: string;

    @Field()
    medicalCondition: string;

    @Field()
    surgeries: string;

    @Field()
    familyHistory: string;
}