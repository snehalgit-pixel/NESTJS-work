import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { PatientModule } from './modules/patient/patient.module';
import { MedicationModule } from './modules/medication/medication.module';
import { ObservationModule } from './modules/observation/observation.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    DoctorModule,
    PatientModule,
    MedicationModule,
    ObservationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
