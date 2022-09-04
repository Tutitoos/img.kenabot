import { Request, Response, Router } from "express";
import { getUser } from "./controllers/discord.controller";
import { arrayCache } from "./index";
import { UsersCache } from "./types/users";

const routes = Router();

routes.get("/user/:userID", async (req: Request, res: Response) => {
    const { userID } = req.params;
    if (!userID) {
        return res.status(200).json({
            status: 200,
            message: "Falta el parámetro userID",
            data: null,
        });
    }
    const userData: UsersCache | undefined = arrayCache.find((user: UsersCache) => user.id === userID);
    if (!userData) {
        let newUserData: UsersCache | undefined = undefined;
        const DATE_NOW = Date.now();
        const { data } = await getUser(userID);
        if (typeof data === "object" && data) {
            newUserData = {
                createdAt: DATE_NOW + 86400000,
                ...data
            }
        }
        if (newUserData) {
            console.log("New user added: ", newUserData.id);
            arrayCache.push(newUserData);
        }
    }
    res.status(200)
    res.setHeader("Content-Type", "image/png")
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate")
    return res.send(userData?.avatar);
});

export default routes;