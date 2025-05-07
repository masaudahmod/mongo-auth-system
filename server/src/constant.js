import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const ORIGIN = process.env.ORIGIN

const MONGO_URI = process.env.MONGO_URI;

const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;

export { PORT, ORIGIN, MONGO_URI, MAIL_USER, MAIL_PASS };
