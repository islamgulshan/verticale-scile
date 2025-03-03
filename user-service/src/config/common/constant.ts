export enum ReferralActionEnum {
  GENERATE_CODE = 'Generate code',
  REDEEM_CODE = 'Redeem code',
  SKIP = 'skip & signup',
}

export const JwtConstants = {
  SECRET: process.env.JWT_SECRET || 'camerajwt', // Load directly from process.env (or use ConfigService as shown in the next step)
  signOptions: {
    expiresIn: '7d', // Hardcoded for now, or load from process.env if needed
  },
};

export enum UserRole {
  CONTENT_CREATOR = 'Content creator',
  UPCOMING_CONTENT_CREATOR = 'Upcomming content creator',
  VIEWER = 'Viewer',
  BUSINESS = 'Business',
}

export enum InvitationRoomLiveType {
  PEOPLE_YOU_CONNECT = 'People you are connected',
  SUBSCRIBERS = 'subscribers',
  SUBSCRIBERS_AND_CONNECTION = 'Subscribers and connections',
  TRUN_OFF = "Turn off"
}

export enum PostNotificationType {
  EVERY_ONE = 'Everyone',
  PEOPLE_YOU_CONNECT = 'People you are connected',
  SUBSCRIBERS = 'subscribers',
  SUBSCRIBERS_AND_CONNECTION = 'Subscribers and connections',
  TRUN_OFF = "Turn off"
}

export enum MomentNotificationType {
  EVERY_ONE = 'Everyone',
  PEOPLE_YOU_CONNECT = 'People you are connected',
  SUBSCRIBERS = 'subscribers',
  SUBSCRIBERS_AND_CONNECTION = 'Subscribers and connections',
  TRUN_OFF = "Turn off"
}


export enum WalletPlainType {
  PREMIUM = 'Premium',
  PREMIUM_PLUS = 'Premium plus',
}