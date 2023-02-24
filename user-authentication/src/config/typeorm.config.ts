import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: true,
      logging: true,
      extra: { charset: 'utf8mb4_unicode_ci' },
    };
  },
};



eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNuZWhhbHBAZ21haWwuY29tIiwic3ViIjp7ImlkIjoxLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNjcxMzkwNjY0LCJleHAiOjE2NzE0NzcwNjR9.QAN26pMv7iIxv_Kv1QPm5fVJGaLotqeJ8DlgYax4J2U


Pareo is a total payment integrity solution that strengthens payer-vendor partnerships. The web 
based application has a large domain of utility such as supplier optimization, audit, fraud, 
provider management, clinical management and health plan configuration, to name a few. The 
aim of the product is to provide total payment integrity solutions along with a competitive 
advantage in the domain of over-payment recovery


Pareo is a total payment integrity solution that strengthens payer-vendor partnerships as well as payer-member relationships. The web based application has a large domain of utility such as supplier optimization, audit, provider management, clinical management and health plan configuration, to name a few. The aim of the product is to provide total payment integrity solutions, maintenance of health plans and medical records along with a competitive advantage in the domain of over-payment recovery. It further aspires to add more functionality in the domain of payer-member relationship management and explore more opportunities in the healthcare domain.