module.exports = {
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3005,
  URL: process.env.CORS_URL || "http://localhost:3005",
  MONGODB_URI: process.env.MONGODB_URI,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  REFRESH_TOKEN_SECRET:
    process.env.REFRESH_TOKEN_SECRET || "REFRESH_TOKEN_SECRET",
  ADMIN: "admin",
  EXPIRES_IN: "200h",
  EXPIRES_IN_ACCESS_TOKEN: "100h",
  EXPIRES_IN_REFRESH_TOKEN: "2000h",
};
