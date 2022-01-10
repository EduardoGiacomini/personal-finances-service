// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const API_PORT = process.env.API_PORT;

export const DATABASE_URL = process.env.DATABASE_URL;

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_SHORT_EXPIRES_IN = process.env.JWT_SHORT_EXPIRES_IN;
export const JWT_LONG_EXPIRES_IN = process.env.JWT_LONG_EXPIRES_IN;
