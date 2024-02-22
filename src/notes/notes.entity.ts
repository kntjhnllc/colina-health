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
export class Notes {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  noteNo: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  date: Date;

  @Column()
  @Field()
  notes: string;

  //Notes Table with FK patientId from PatientInformation table
  @ManyToOne(() => PatientInformation, (patient) => patient.notes)
  @JoinColumn({
    name: 'patientId',
  })
  patient: PatientInformation;
}
