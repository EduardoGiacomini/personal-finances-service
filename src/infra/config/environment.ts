// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

export const API_NAME = process.env.API_NAME;
export const API_PORT = process.env.API_PORT;
export const API_PREFIX_URL = process.env.API_PREFIX_URL;

export const DATABASE_URL = process.env.DATABASE_URL;

export const ENCRYPTOR_SALT = Number(process.env.ENCRYPTOR_SALT);

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_TOKEN_EXPIRATION = process.env.JWT_TOKEN_EXPIRATION;
export const JWT_REFRESH_TOKEN_EXPIRATION =
  process.env.JWT_REFRESH_TOKEN_EXPIRATION;
