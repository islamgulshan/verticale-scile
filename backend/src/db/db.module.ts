// db.module.ts
import { Module } from '@nestjs/common';
import { Pool } from 'pg';

@Module({
  providers: [
    {
      provide: 'PG_POOL',
      useValue: new Pool({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'root',
        database: 'postgres',
      }),
    },
  ],
  exports: ['PG_POOL'],
})
export class DbModule {}
