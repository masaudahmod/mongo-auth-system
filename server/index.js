import { app } from "./src/app.js";
import { PORT } from "./src/constant.js";
import { dbConnect } from "./src/database/index.js";

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  dbConnect();
});