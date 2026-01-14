import { config } from "dotenv";
import { express_app } from "./app";
config();

const PORT = process.env.PORT;

const app_instance = new express_app().app;

app_instance.listen(PORT!, () => {
  console.log(
    `Boilerplate Generator and Code Runner Service is running on port ${PORT}`
  );
});
