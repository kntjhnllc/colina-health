import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesResolver } from './notes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientInformation } from 'src/patient_information/patient_information.entity';
import { Notes } from './notes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notes, PatientInformation])],
  providers: [NotesService, NotesResolver],
})
export class NotesModule {}
