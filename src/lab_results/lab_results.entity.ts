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
export class LabResults {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  labResultsNo: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  date: Date;

  @Column()
  @Field()
  hemoglobinA1c: string;

  @Column()
  @Field()
  fastingBloodGlucose: string;

  @Column()
  @Field()
  totalCholesterol: string;

  @Column()
  @Field()
  ldlCholesterol: string;

  @Column()
  @Field()
  hdlCholesterol: string;

  @Column()
  @Field()
  triglycerides: string;

  //LabResults Table with FK patientId from PatientInformation table
  @ManyToOne(() => PatientInformation, (patient) => patient.lab_results)
  @JoinColumn({
    name: 'patientId',
  })
  patient: PatientInformation;
}
