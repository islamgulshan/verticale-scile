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
  TRUN_OFF = 'Turn off',
}

export enum PostNotificationType {
  EVERY_ONE = 'Everyone',
  PEOPLE_YOU_CONNECT = 'People you are connected',
  SUBSCRIBERS = 'subscribers',
  SUBSCRIBERS_AND_CONNECTION = 'Subscribers and connections',
  TRUN_OFF = 'Turn off',
}

export enum MomentNotificationType {
  EVERY_ONE = 'Everyone',
  PEOPLE_YOU_CONNECT = 'People you are connected',
  SUBSCRIBERS = 'subscribers',
  SUBSCRIBERS_AND_CONNECTION = 'Subscribers and connections',
  TRUN_OFF = 'Turn off',
}

export enum WalletPlainType {
  PREMIUM = 'Premium',
  PREMIUM_PLUS = 'Premium plus',
}

export enum ShowPrivacyConetntType {
  CURRENT_LOCATION = 'My current location',
  WHOLE_WORLD = 'The whole world',
}

export enum PrivacyContentType {
  EVERY_ONE = 'Everyone',
  PEOPLE_YOU_CONNECT = 'People you are connected',
  SUBSCRIBERS = 'subscribers',
  NO_ONE = 'No one',
}

export enum PrivacyRelationType {
  EVERY_ONE = 'Everyone',
  CONNECTION = 'Connection',
  SUBSCRIBERS = 'Subscribers',
}

export enum WhoCanYouLimit {
  ACCOUNT_CHAT = 'Comments on your content from new accounts and chat',
  ACCOUNT_CHAT_MENTION_TAGS = 'Comments on your content from new accounts, chats, tags, mentions, and moments replies ',
}

export enum WhoCanBeLimited {
  ACCOUNT_NOT_CONN_SUBS = 'Accounts i am not connected or subscribed to',
  ACCOUNT_NOT_CONN_SUBS_NEW_INTERAC = 'New interactions to my account,accounts not connected or subscribed to mine',
}

export enum WhoCanMessageYou {
  EVERY_ONE = 'EveryOne',
  NO_ONE = 'No one',
  ONLY_CONNECTED = 'Only people that i am connected to',
}

export enum WhoCanCommentYou {
  EVERY_ONE = 'Everyone',
  PEOPLE_YOU_CONNECT = 'People you are connected',
  SUBSCRIBERS = 'subscribers',
  SUBSCRIBERS_AND_CONNECTION = 'Subscribers and connections',
  NO_ONE = 'No one',
}
