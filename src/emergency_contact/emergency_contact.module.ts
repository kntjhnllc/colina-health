import { Module } from '@nestjs/common';
import { EmergencyContactService } from './emergency_contact.service';
import { EmergencyContactResolver } from './emergency_contact.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmergencyContact } from './emergency-contact.entity';
import { PatientInformation } from 'src/patient_information/patient_information.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmergencyContact, PatientInformation])],
  providers: [EmergencyContactService, EmergencyContactResolver],
})
export class EmergencyContactModule {}
