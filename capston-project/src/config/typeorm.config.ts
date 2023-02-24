import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
export { TypeOrmModuleOptions }  from '@nestjs/typeorm';
export const typeOrmAsynConfig:TypeOrmModuleAsyncOptions= {
    useFactory: async ():Promise<TypeOrmModuleOptions> => {
        return {
            type: "postgres",
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            synchronize: true,
            logging: true,
            entities: ['dist/**/*.entity.{ts,js}'],
            extra: { charset: 'utf8mb4_unicode_ci' },
           // subscribers: [],
           // migrations: [],
        };
    }
}