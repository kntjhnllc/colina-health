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
export class Appointment {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  appointmentId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  dateCreated: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  appointmentDate: Date;

  @Column({ type: 'time', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  appointmentTime: string;

  @Column()
  @Field()
  details: string;

  @Column()
  @Field()
  appointmentStatus: string;

  //Appointment Table with FK patientId from PatientInformation table
  @ManyToOne(() => PatientInformation, (patient) => patient.appointment)
  @JoinColumn({
    name: 'patientId',
  })
  patient: PatientInformation;
}
