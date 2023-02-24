import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'db/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { ObservationsModule } from './modules/observations/observations.module';
import { PatientModule } from './modules/patient/patient.module';
import { TestsModule } from './modules/tests/tests.module';
import { UserModule } from './modules/user/user.module';
import { HospitalModule } from './modules/hospital/hospital.module';

@Module({
  imports: [
    DoctorModule,
    PatientModule,
    TestsModule,
    ObservationsModule,
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    HospitalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
