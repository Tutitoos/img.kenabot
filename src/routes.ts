import { Request, Response, Router } from "express";
import { ParamsDictionary } from 'express-serve-static-core';
import sharp, { FormatEnum } from "sharp";
import { getUser } from "./controllers/discord.controller";
import { arrayCache, config } from "./index";
import { UsersCache } from "./types/users";

const routes = Router();

routes.get("/users", (_req: Request, res: Response) => {
    res.status(200)
    res.setHeader("Content-Type", "application/json")
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate")
    return res.send(arrayCache.map((user: UsersCache) => ({
        createdAt: user.createdAt,
        id: user.id,
        avatar: `https://img.kenabot.xyz/user/${user.id}`
    })));
});

routes.get("/user/:userID", async (req: Request, res: Response) => {
    const { userID } = getParams(req.params);
    const { format, width, height } = getQuery(req.query);
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
                createdAt: DATE_NOW + config.createdAt,
                ...data
            }
        }
        if (newUserData) {
            console.log("New user added: ", newUserData.id);
            arrayCache.push(newUserData);
        }
    }
    if (userData) {
        res.status(200);
        res.setHeader("Content-Type", `image/${format}`);
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        return resize(userData.avatar, format, width, height).pipe(res);
    }
});


function resize(path: Buffer, format: keyof FormatEnum, width: number, height: number) {
    return sharp(path)
        .toFormat(format)
        .resize(width, height);
}


function getParams(params: ParamsDictionary): {
    userID: string | undefined;
} {
    return {
        userID: params["userID"] || undefined,
    };
}

function getQuery(query: any): {
    format: keyof FormatEnum;
    width: number;
    height: number;
} {
    return {
        format: query["format"] || "png",
        width: parseFloat(query["width"] || "128"),
        height: parseFloat(query["height"] || "128"),
    };
}

export default routes;