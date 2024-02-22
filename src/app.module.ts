import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientInformationModule } from './patient_information/patient_information.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationModule } from './medication/medication.module';
import { VitalSignsModule } from './vital_signs/vital_signs.module';
import { MedicalHistoryModule } from './medical_history/medical_history.module';
import { LabResultsModule } from './lab_results/lab_results.module';
import { ConfigModule } from '@nestjs/config';
import { NotesModule } from './notes/notes.module';
import { AppointmentModule } from './appointment/appointment.module';
import { EmergencyContactModule } from './emergency_contact/emergency_contact.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.local' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: String(process.env.DB_PASSWORD),
      database: String(process.env.DB_DATABASE),
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      logging: process.env.DB_LOGGING === 'true',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    PatientInformationModule,
    MedicationModule,
    VitalSignsModule,
    MedicalHistoryModule,
    LabResultsModule,
    NotesModule,
    AppointmentModule,
    EmergencyContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
