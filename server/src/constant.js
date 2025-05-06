import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const ORIGIN = process.env.ORIGIN

export { PORT, ORIGIN };
