module.exports = {
  reactStrictMode: true,
  env: {
    MONGO_URI: process.env.MONGO_URI,
    JWT_KEY: process.env.JWT_KEY,
  },
  swcMinify: false,
};
