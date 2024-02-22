import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PatientInformation } from 'src/patient_information/patient_information.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class EmergencyContact {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  contactId: number;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  phoneNumber: string;

  @Column()
  @Field()
  patientRelationship: string;

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

  //Emergency Contact Table with FK patientId from PatientInformation table
  @ManyToOne(() => PatientInformation, (patient) => patient.emergency_contact)
  @JoinColumn({
    name: 'patientId',
  })
  patient: PatientInformation;
}
