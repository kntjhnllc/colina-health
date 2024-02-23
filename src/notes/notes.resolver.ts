import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Notes } from './notes.entity';
import { NotesService } from './notes.service';
import { CreateNotesForPatientInput } from './dto/create-notes.input';
import { UpdateNotesForPatientInput } from './dto/update-notes.input';

@Resolver(() => Notes)
export class NotesResolver {
  constructor(private notesService: NotesService) {}

  // Query for patient notes
  // query {
  //   getPatientNotes(patientId:1){
  //     noteNo
  //     date
  //     notes
  //   }
  // }

  @Query(() => [Notes], { name: 'getPatientNotes' })
  async getPatientNotes(
    @Args('patientId', { type: () => Int }) patientId: number,
  ): Promise<Notes[]> {
    try {
      return this.notesService.getPatientNotes(patientId);
    } catch (error) {
      console.error('Error fetching patient notes:', error);
      throw new Error('Failed to fetch patient notes');
    }
  }

  // Create Notes for Patient
  //
  // mutation {
  //   createNotesForPatient(createNotesForPatientInput: {
  //     patientId: 1,
  //     date: "2024-02-22T12:00:00Z",
  //     notes: "Sample notes for the patient"
  //   }) {
  //     noteNo
  //     date
  //     notes
  //   }
  // }

  @Mutation(() => Notes)
  async createNotesForPatient(
    @Args('createNotesForPatientInput')
    createNotesForPatientInput: CreateNotesForPatientInput,
  ): Promise<Notes> {
    try {
      return this.notesService.createNotesForPatient(
        createNotesForPatientInput,
      );
    } catch (error) {
      console.error('Error creating notes for patient:', error);
      throw new Error('Failed to create notes for patient');
    }
  }

  // UPDATE NOTES FOR PATIENT

  //   mutation {
  //     updateNotesForPatient(updateNotesForPatientInput: {
  //      patientId: 1,
  //      noteNo: 1,
  //       notes: "Hi hello tring to update"
  //     }) {
  //    noteNo
  //    notes
  //     }
  // }

  @Mutation(() => Notes)
  async updateNotesForPatient(
    @Args('updateNotesForPatientInput')
    updateNotesForPatientInput: UpdateNotesForPatientInput,
  ): Promise<Notes> {
    try {
      return this.notesService.updateNotesForPatient(
        updateNotesForPatientInput,
      );
    } catch (error) {
      console.error('Error updating notes:', error);
      throw new Error('Failed to update notes');
    }
  }
}
