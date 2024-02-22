import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentResolver } from './appointment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { PatientInformation } from 'src/patient_information/patient_information.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, PatientInformation])],
  providers: [AppointmentService, AppointmentResolver],
})
export class AppointmentModule {}
