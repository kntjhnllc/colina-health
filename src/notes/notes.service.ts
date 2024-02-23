import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notes } from './notes.entity';
import { Repository } from 'typeorm';
import { PatientInformation } from 'src/patient_information/patient_information.entity';
import { CreateNotesForPatientInput } from './dto/create-notes.input';
import { UpdateNotesForPatientInput } from './dto/update-notes.input';
import { UpdateAppointmentForPatientInput } from 'src/appointment/dto/update-appointment-for-patient.input';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Notes) private notesRepository: Repository<Notes>,
    @InjectRepository(PatientInformation)
    private patientInformationRepository: Repository<PatientInformation>,
  ) {}

  async createNotesForPatient(
    createNotesForPatientInput: CreateNotesForPatientInput,
  ): Promise<Notes> {
    const { patientId, ...notesData } = createNotesForPatientInput;

    const notes = new Notes();
    notes.date = notesData.date;
    notes.notes = notesData.notes;

    const patient = await this.patientInformationRepository.findOne({
      where: { patientId },
    });

    if (!patient) {
      throw new Error('Patient not Found');
    }

    notes.patient = patient;

    return this.notesRepository.save(notes);
  }

  async getPatientNotes(patientId: number): Promise<Notes[]> {
    return this.notesRepository.find({
      where: {
        patient: {
          patientId,
        },
      },
    });
  }

  //Update Notes for Patient

  async updateNotesForPatient(
    updateNotesForPatientInput: UpdateNotesForPatientInput,
  ): Promise<Notes> {
    const { noteNo, ...updateData } = updateNotesForPatientInput;

    const notes = await this.notesRepository.findOneOrFail({
      where: {
        noteNo,
      },
    });

    Object.assign(notes, updateData);

    return this.notesRepository.save(notes);
  }
}
