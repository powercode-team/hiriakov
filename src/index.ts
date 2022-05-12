import "reflect-metadata";
import express from "express";
import * as bodyParser from "body-parser";
import routes from "./modules/routes/auth";

const app = express();

app.use(bodyParser.json());

app.use("/api", routes);

app.listen(3000, () => {
	console.log("Server started on port 3000");
});
