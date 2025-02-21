export const JwtConstants = {
    SECRET: process.env.JWT_SECRET || 'camerajwt', // Load directly from process.env (or use ConfigService as shown in the next step)
    signOptions: {
      expiresIn: '7d', // Hardcoded for now, or load from process.env if needed
    },
  };