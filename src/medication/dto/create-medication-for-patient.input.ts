import { Field, InputType, Int } from "@nestjs/graphql";


@InputType()
export class CreateMedicationForPatientInput {

    @Field(() => Int)
    patientId: number;

    @Field()
    medicationDate: Date;

    @Field()
    comments: string

    @Field()
    medicationStatus: string

}