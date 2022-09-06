"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const discord_controller_1 = require("./controllers/discord.controller");
const index_1 = require("./index");
const routes = (0, express_1.Router)();
routes.get("/users", (_req, res) => {
    res.status(200);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    return res.send(index_1.arrayCache.map((user) => ({
        createdAt: user.createdAt,
        id: user.id,
        avatar: `https://img.kenabot.xyz/user/${user.id}`
    })));
});
routes.get("/user/:userID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.params;
    if (!userID) {
        return res.status(200).json({
            status: 200,
            message: "Falta el parámetro userID",
            data: null,
        });
    }
    const userData = index_1.arrayCache.find((user) => user.id === userID);
    if (!userData) {
        let newUserData = undefined;
        const DATE_NOW = Date.now();
        const { data } = yield (0, discord_controller_1.getUser)(userID);
        if (typeof data === "object" && data) {
            newUserData = Object.assign({ createdAt: DATE_NOW + 86400000 }, data);
        }
        if (newUserData) {
            console.log("New user added: ", newUserData.id);
            index_1.arrayCache.push(newUserData);
        }
    }
    res.status(200);
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    return res.send(userData === null || userData === void 0 ? void 0 : userData.avatar);
}));
exports.default = routes;
