import cors from "cors";
import express from "express";
import routes from "./routes";
const { API_PORT } = process.env;

export async function server() {
    const app = express();
    app.set("port", API_PORT)
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.disable("x-powered-by");
    app.use(routes);
    app.listen(app.get("port"), () =>
        console.log(`Conectado http://localhost:${app.get("port")}/user/397453373479190538`)
    );
}