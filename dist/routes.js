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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sharp_1 = __importDefault(require("sharp"));
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
    const { userID } = getParams(req.params);
    const { format, width, height } = getQuery(req.query);
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
            newUserData = Object.assign({ createdAt: DATE_NOW + index_1.config.createdAt }, data);
        }
        if (newUserData) {
            console.log("New user added: ", newUserData.id);
            index_1.arrayCache.push(newUserData);
        }
    }
    if (userData) {
        res.status(200);
        res.setHeader("Content-Type", `image/${format}`);
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        return resize(userData.avatar, format, width, height).pipe(res);
    }
}));
function resize(path, format, width, height) {
    return (0, sharp_1.default)(path)
        .toFormat(format)
        .resize(width, height);
}
function getParams(params) {
    return {
        userID: params["userID"] || undefined,
    };
}
function getQuery(query) {
    return {
        format: query["format"] || "png",
        width: parseFloat(query["width"] || "128"),
        height: parseFloat(query["height"] || "128"),
    };
}
exports.default = routes;
