import app from "./app";
import { PORT } from "../src/config/serverConfig";
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
