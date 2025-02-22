export enum ReferralActionEnum {
    GENERATE_CODE = 'generate_code',
    REDEEM_CODE = 'redeem_code',
    SKIP = 'skip',
}

export const JwtConstants = {
    SECRET: process.env.JWT_SECRET || 'camerajwt', // Load directly from process.env (or use ConfigService as shown in the next step)
    signOptions: {
      expiresIn: '7d', // Hardcoded for now, or load from process.env if needed
    },
  };

  export enum UserRole {
    CONTENT_CREATOR = 'content_creator',
    UPCOMING_CONTENT_CREATOR = 'upcomming_content_creator',
    VIEWER = 'viewer',
    BUSINESS = 'business',
  }
  