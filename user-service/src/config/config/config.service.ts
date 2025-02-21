export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      port: process.env.USER_SERVICE_PORT,
      host: process.env.USER_SERVICE_HOST,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
