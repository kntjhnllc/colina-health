import { Field, Int, ObjectType } from "@nestjs/graphql";
import { PatientInformation } from "src/patient_information/patient_information.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class VitalSigns{

    @PrimaryGeneratedColumn()
    @Field(type => Int)
    vitalSignsNo: number;

    @Column({type: 'timestamp' , default: () => 'CURRENT_TIMESTAMP'})
    @Field()
    date: Date

    @Column()
    @Field()
    bloodPressure: string;

    @Column()
    @Field()
    heartRate: string;

    @Column()
    @Field()
    temperature: string;

    @Column()
    @Field()
    respiratoryRate: string;

     //vital_signs Table with FK patientId from PatientInformation table
     @ManyToOne(() => PatientInformation, patient => patient.vital_signs)
     @JoinColumn({
         name:"patientId" 
         })
     patient: PatientInformation;
    
}