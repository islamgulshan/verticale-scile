export default () => ({
  userServicePort: parseInt(process.env.USER_SERVICE_PORT, 10),
  userServiceHost: process.env.USER_SERVICE_HOST,
  mongo_uri: process.env.MONGO_URI
});
