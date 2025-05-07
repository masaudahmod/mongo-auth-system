import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const ORIGIN = process.env.ORIGIN

const MONGO_URI = process.env.MONGO_URI;

export { PORT, ORIGIN, MONGO_URI };
