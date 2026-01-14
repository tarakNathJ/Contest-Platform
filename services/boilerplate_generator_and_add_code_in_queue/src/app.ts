import express from "express";
import type { Express } from "express";
import cors from "cors";
import routers from "./router/index.route";


class express_app {
  public app: Express = express();

  constructor() {
    this.app.use(
      cors({
        origin: "*",
      })
    );
    this.app.use(express.json());
    this.app.use("/api/qustion-info", routers);

  }
}

export { express_app };
