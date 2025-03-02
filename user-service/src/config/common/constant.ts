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

export enum InvitationRoomLiveType {
  PEOPLE_YOU_CONNECT = 'people you are connect',
  SUBSCRIBERS = 'subscribers',
  SUBSCRIBERS_AND_CONNECTION = 'subscribers and connections',
  TRUN_OFF = "turn off"
}

export enum PostNotificationType {
  EVERY_ONE = 'everyone',
  PEOPLE_YOU_CONNECT = 'people you are connected',
  SUBSCRIBERS = 'subscribers',
  SUBSCRIBERS_AND_CONNECTION = 'subscribers and connections',
  TRUN_OFF = "turn off"
}