import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientInformationModule } from './patient_information/patient_information.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PatientInformationResolver } from './patient_information/patient_information.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationModule } from './medication/medication.module';
import { VitalSignsModule } from './vital_signs/vital_signs.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password:'postgres', 
    port: 5432,
    database: 'ColinaHealth_db',
    synchronize: true,
    logging: true,
    entities: ["dist/**/*.entity{.ts,.js}"],
    extra: {
      trustedConnection: true,
      trustServerCertificate: true,
      integratedSecurity: true
    },
  }),GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  }), 
  PatientInformationModule, MedicationModule, VitalSignsModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
