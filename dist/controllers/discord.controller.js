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
exports.getUser = void 0;
const axios_1 = __importDefault(require("axios"));
const { DISCORD_API_URL, DISCORD_TOKEN } = process.env;
function catchError(error) {
    return {
        success: false,
        data: error.message,
    };
}
function getUser(id) {
    return axios_1.default
        .request({
        method: "GET",
        url: `${DISCORD_API_URL}/users/${id}`,
        headers: {
            Authorization: `Bot ${DISCORD_TOKEN}`,
        },
    })
        .then((response) => __awaiter(this, void 0, void 0, function* () {
        if (response.status !== 200)
            throw response;
        const { data } = response;
        const avatarBuffer = yield createAvatarBuffer(`https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`);
        return {
            success: true,
            data: {
                id: data.id,
                avatar: avatarBuffer.success ? avatarBuffer.data : null,
            },
        };
    }))
        .catch(catchError);
}
exports.getUser = getUser;
function createAvatarBuffer(avatar) {
    return __awaiter(this, void 0, void 0, function* () {
        return axios_1.default
            .request({
            method: "GET",
            url: avatar,
            responseType: "arraybuffer"
        })
            .then((response) => __awaiter(this, void 0, void 0, function* () {
            if (response.status !== 200)
                throw response;
            const { data } = response;
            return {
                success: true,
                data,
            };
        }))
            .catch(catchError);
    });
}
