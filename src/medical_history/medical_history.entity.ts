import { Field, Int, ObjectType } from "@nestjs/graphql";
import { PatientInformation } from "src/patient_information/patient_information.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
@ObjectType()
export class MedicalHistory{

    @PrimaryGeneratedColumn()
    @Field(type => Int)
    medicalHistoryNo: number;

    @Column()
    @Field()
    allergies: string;

    @Column()
    @Field()
    medicalConditions: string;

    @Column()
    @Field()
    surgeries: string;

    @Column()
    @Field()
    familyHistory: string;

    //MedicalHistory Table with FK patientId from PatientInformation table
    @ManyToOne(() => PatientInformation, patient => patient.medical_history)
    @JoinColumn({
        name:"patientId" 
        })
    patient: PatientInformation;
}