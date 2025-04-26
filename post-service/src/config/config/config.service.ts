export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      port: process.env.POST_SERVICE_PORT,
      host: process.env.POST_SERVICE_HOST,
      mongo_uri: process.env.MONGO_URI,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
