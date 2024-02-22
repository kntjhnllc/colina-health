import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Appointment } from 'src/appointment/appointment.entity';
import { EmergencyContact } from 'src/emergency_contact/emergency-contact.entity';
import { LabResults } from 'src/lab_results/lab_results.entity';
import { MedicalHistory } from 'src/medical_history/medical_history.entity';
import { Medication } from 'src/medication/medication.entity';
import { Notes } from 'src/notes/notes.entity';
import { VitalSigns } from 'src/vital_signs/vital_signs.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class PatientInformation {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  patientId: number;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
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
  @OneToMany(() => Medication, (medication) => medication.patient)
  @Field(() => [Medication], { nullable: true })
  medications: Medication[];

  //Patient information to table VitalSigns
  @OneToMany(() => VitalSigns, (vital_signs) => vital_signs.patient)
  @Field(() => [VitalSigns], { nullable: true })
  vital_signs: VitalSigns[];

  //Patient information to table MedicalHistory
  @OneToMany(() => MedicalHistory, (medical_history) => medical_history.patient)
  @Field(() => [MedicalHistory], { nullable: true })
  medical_history: MedicalHistory[];

  //Patient information to table LabResults
  @OneToMany(() => LabResults, (lab_results) => lab_results.patient)
  @Field(() => [LabResults], { nullable: true })
  lab_results: LabResults[];

  //Patient information to table Notes
  @OneToMany(() => Notes, (notes) => notes.patient)
  @Field(() => [Notes], { nullable: true })
  notes: Notes[];

  //Patient information to table Appointment
  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  @Field(() => [Appointment], { nullable: true })
  appointment: Appointment[];

  //Patient information to table Emergency Contact
  @OneToMany(
    () => EmergencyContact,
    (emergency_contact) => emergency_contact.patient,
  )
  @Field(() => [EmergencyContact], { nullable: true })
  emergency_contact: EmergencyContact[];
}
