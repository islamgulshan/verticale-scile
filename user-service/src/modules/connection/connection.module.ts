import { Module } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { ConnectionController } from './connection.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection, ConnectionSchema } from './connection.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Connection.name,
        schema: ConnectionSchema,
      },
    ]),
  ],
  providers: [ConnectionService],
  controllers: [ConnectionController],
  exports: [ConnectionService],
})
export class ConnectionModule {}
