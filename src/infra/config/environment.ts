/* eslint-disable */
require("dotenv").config({ path: process.cwd() + "/env/service/.env" });

export const API_NAME = process.env.API_NAME;
export const API_PORT = process.env.API_PORT;
export const API_PREFIX_URL = process.env.API_PREFIX_URL;
export const API_LOG_LEVEL = process.env.API_LOG_LEVEL;

export const DATABASE_URL = process.env.DATABASE_URL;

export const ENCRYPTOR_SALT = Number(process.env.ENCRYPTOR_SALT);

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_ACCESS_TOKEN_EXPIRATION = Number(process.env.JWT_ACCESS_TOKEN_EXPIRATION);
export const JWT_REFRESH_TOKEN_EXPIRATION = Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION);
