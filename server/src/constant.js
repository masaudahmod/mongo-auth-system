import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;
const ORIGIN = process.env.ORIGIN

const MONGO_URI = process.env.MONGO_URI;

const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;

const ACCESSTOKEN_SECRET = process.env.ACCESSTOKEN_SECRET;
const REFRESHTOKEN_SECRET = process.env.REFRESHTOKEN_SECRET;

export { PORT, ORIGIN, MONGO_URI, MAIL_USER, MAIL_PASS, ACCESSTOKEN_SECRET, REFRESHTOKEN_SECRET };
