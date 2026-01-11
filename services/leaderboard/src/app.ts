import express from "express";
import cors from "cors";
import route from "./router/route";
class express_init {
  private app = express();
  constructor(port: number) {
    this.app.use(cors());
    this.app.use(express.json());

    this.app.use("/api", route);
    this.app.get("/", (req, res) => {
      return res.status(200).json("seccess");
    });

    this.app.listen(port, () => {
      console.log(`server start at ${port}`);
    });
  }
}

export { express_init };
