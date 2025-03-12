import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConnectionService } from './connection.service';
import { Connection } from './connection.schema';

@Controller('connection')
export class ConnectionController {
  constructor(private readonly ConnectionService: ConnectionService) {}
  @MessagePattern('user-connection')
  connect(@Payload() dto: Partial<Connection>) {
    return this.ConnectionService.connect(dto);
  }
  @MessagePattern('user-request-connection')
  request(@Payload() payload?: Connection) {
    return this.ConnectionService.request(payload);
  }

  @MessagePattern('user-remove-connection')
  reject(@Payload() dto: Partial<Connection>) {
    return this.ConnectionService.remove(dto);
  }

  @MessagePattern('get-user-connection')
  getConnection(@Payload() user_id: string) {
    return this.ConnectionService.getConnections(user_id);
  }
  @MessagePattern('get-user-connection-request')
  getConnectionRequest(@Payload() user_id: string) {
    return this.ConnectionService.getConnectionRequest(user_id);
  }
}
