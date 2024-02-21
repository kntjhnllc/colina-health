import { Field, InputType, Int } from "@nestjs/graphql";


@InputType()
export class createVitalSignsForPatientInput{

    @Field(() => Int)
    patientId: number;

    @Field()
    date: Date

    @Field()
    bloodPressure: string;

    @Field()
    heartRate: string;

    @Field()
    temperature: string;

    @Field()
    respiratoryRate: string;
}