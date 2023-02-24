import { DataSource, DataSourceOptions } from "typeorm";
export const typeOrmConfig: DataSourceOptions ={
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Emids123",
    database: "capston",
    synchronize: true,
    logging: true,
    entities: [__dirname +'/../**/*.entity.js'],
   // subscribers: [],
    // migrations: ['dist/db/migrations/*.js'],
};

const dataSource= new DataSource(typeOrmConfig);
export default dataSource;