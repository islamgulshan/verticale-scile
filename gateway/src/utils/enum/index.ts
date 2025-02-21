export enum ResponseMessage {
    SUCCESS = 'Success',
    CREATED_SUCCESSFULLY = 'Created successfully',
    CONTENT_NOT_FOUND = 'Content not found',
    PLEASE_LOGIN_WITH = 'Please Login With : ',
    INVALID_USERNAME_OR_PASSWORD = 'Invalid email or password', // both admin and customer
    USER_ALREADY_EXISTS = 'User with the same email already exists', // both admin and customer
    FORGOT_PASSWORD_EMAIL = 'Please Check Your Email To Reset Password',
}

// some code enums for sending response code in api response

export enum ResponseCode {
    SUCCESS = 200,
    CREATED_SUCCESSFULLY = 201,
    INTERNAL_ERROR = 500,
    NOT_FOUND = 404,
    CONTENT_NOT_FOUND = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
}

export enum LoggerMessages {
    API_CALLED = 'Api Has Been Called.',
}

export enum DefaultEnum {
    DEFAULT = 'default',
}

export enum NodeEnv {
    TEST = 'test',
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
}