import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Emids123',
    database: 'store',
    synchronize: true,
    entities: ['dist/**/*.entity.{ts,js}'],
    logging: true
}