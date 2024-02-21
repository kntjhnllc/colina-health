import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Medication } from "src/medication/medication.entity";
import { VitalSigns } from "src/vital_signs/vital_signs.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class PatientInformation{

    @PrimaryGeneratedColumn()
    @Field(type => Int)
    patientId: number;

    @Column()
    @Field()
    firstName: string;

    @Column()
    @Field()
    lastName: string;

    @Column({type: 'timestamp' , default: () => 'CURRENT_TIMESTAMP'})
    @Field()
    dateOfBirth: Date;

    @Column()
    @Field()
    gender: string;

    @Column()
    @Field()
    city: string;

    @Column()
    @Field()
    state: string;

    @Column()
    @Field()
    zip: string;

    @Column()
    @Field()
    country: string;

    @Column()
    @Field()
    phoneNo: string;

    @Column()
    @Field()
    allergies: string;

    @Column()
    @Field()
    codeStatus: string;


    //RELATIONAL FIELDS

    //Patient information to table medication
    @OneToMany(() => Medication, medication => medication.patient)
    @Field(() => [Medication], { nullable: true }) // Define the field type as an array of Medication objects
    medications: Medication[];

    //Patient information to table VitalSigns
    @OneToMany(() => VitalSigns, vital_signs => vital_signs.patient)
    @Field(() => [VitalSigns], { nullable: true }) // Define the field type as an array of VitalSigns objects
    vital_signs: VitalSigns[];
}