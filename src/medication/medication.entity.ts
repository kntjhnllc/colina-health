import { Field, Int, ObjectType } from "@nestjs/graphql";
import { PatientInformation } from "src/patient_information/patient_information.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
@ObjectType()
export class Medication{

    @PrimaryGeneratedColumn()
    @Field(type => Int)
    medicationNo: number;

    @Column({type: 'timestamp' , default: () => 'CURRENT_TIMESTAMP'})
    @Field()
    medicationDate: Date;

    @Column()
    @Field()
    comments: string
    
    @Column()
    @Field()
    medicationStatus: string


    //Medication Table with FK patientId from PatientInformation table
    @ManyToOne(() => PatientInformation, patient => patient.medications)
    @JoinColumn({
        name:"patientId" 
        })
    patient: PatientInformation;
}