import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { Repository } from 'typeorm';
import { PatientInformation } from 'src/patient_information/patient_information.entity';
import { CreateAppointmentForPatientInput } from './dto/create-appointment-for-patient.input';
import { App } from 'supertest/types';
import { UpdateAppointmentForPatientInput } from './dto/update-appointment-for-patient.input';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(PatientInformation)
    private patientInformationRepository: Repository<PatientInformation>,
  ) {}

  async createAppointmentForPatient(
    createAppointmentForPatientInput: CreateAppointmentForPatientInput,
  ): Promise<Appointment> {
    const { patientId, ...appointmentData } = createAppointmentForPatientInput;

    const appointment = new Appointment();
    appointment.dateCreated = appointmentData.dateCreated;
    appointment.appointmentDate = appointmentData.appointmentDate;
    appointment.appointmentTime = appointmentData.appointmentTime;
    appointment.details = appointmentData.details;
    appointment.appointmentStatus = appointmentData.appointmentStatus;

    const patient = await this.patientInformationRepository.findOne({
      where: {
        patientId,
      },
    });

    if (!patient) {
      throw new Error('Patient not found!');
    }

    appointment.patient = patient;

    return this.appointmentRepository.save(appointment);
  }

  async getPatientAppointment(patientId: number): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      where: {
        patient: {
          patientId,
        },
      },
    });
  }

  //Update Appointment for Patient

  async updateAppointmentForPatient(
    updateAppointmentForPatientInput: UpdateAppointmentForPatientInput,
  ): Promise<Appointment> {
    const { appointmentId, ...updateData } = updateAppointmentForPatientInput;

    const appointment = await this.appointmentRepository.findOneOrFail({
      where: { appointmentId },
    });

    Object.assign(appointment, updateData);

    return this.appointmentRepository.save(appointment);
  }
}
