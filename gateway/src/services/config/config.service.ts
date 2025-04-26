import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.port = +process.env.GATEWAY_PORT;
    this.envConfig.USER_SERVICE_PORT = +process.env.USER_SERVICE_PORT;
    this.envConfig.USER_SERVICE_HOST = process.env.USER_SERVICE_HOST;
    this.envConfig.POST_SERVICE_PORT = +process.env.POST_SERVICE_PORT;
    this.envConfig.POST_SERVICE_HOST = process.env.POST_SERVICE_HOST;

    this.envConfig.userService = {
      options: {
        port: this.envConfig.USER_SERVICE_PORT,
        host: this.envConfig.USER_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };

    this.envConfig.postService = {
      options: {
        port: this.envConfig.POST_SERVICE_PORT,
        host: this.envConfig.POST_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
