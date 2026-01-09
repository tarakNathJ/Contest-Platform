import express from "express";
import type { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routers from "./router/index.route";
import { PrometheusService } from "@matrix/contestplatfrom";
import responceTime from "response-time";
// const matrix = new PrometheusService();
class express_app {
  public app: Express = express();

  constructor() {
    this.app.use(
      cors({
        origin: "*",
      })
    );

    // this.app.use(
    //   responceTime((req, res, time) => {
    //     matrix.req_res_time
    //       .labels({
    //         method: req.method || "UNKNOWN_METHOD",
    //         route:
    //           //@ts-ignore
    //           (req.route && req.route.path) ||
    //           //@ts-ignore
    //           req.originalUrl ||
    //           req.url ||
    //           "UNKNOWN_ROUTE",
    //         status_code: res.statusCode.toString(),
    //       })
    //       .observe(time);
    //   })
    // );

    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use("/api/auth", routers);

    // this.app.get("/metrics", async (req, res) => {
    //   try {
    //     res.set("Content-Type", matrix.registry.contentType);
    //     const data = await matrix.registry.metrics();
    //     res.send(data);
    //   } catch (err: any) {
    //     res.status(500).send(`Error collecting metrics: ${err.message}`);
    //   }
    // });
  }
}

export { express_app };
