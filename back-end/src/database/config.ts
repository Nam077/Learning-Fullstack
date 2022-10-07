import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../account/entities/account.entity';

export const TypeOrmModuleConfig = TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'nest',
    entities: [Account],
    synchronize: true,
});
