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
exports.delay = exports.arrayCache = exports.config = void 0;
require("dotenv/config");
const discord_controller_1 = require("./controllers/discord.controller");
const server_1 = require("./server");
exports.config = {
    createdAt: 86400000,
    refresh: 86400000
};
exports.arrayCache = [];
let loading = false;
const delay = (timeout) => __awaiter(void 0, void 0, void 0, function* () { return new Promise((resolve) => setTimeout(resolve, timeout)); });
exports.delay = delay;
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, server_1.server)();
        if (!loading)
            yield refreshData();
        if (loading)
            setInterval(() => refreshData(), exports.config.refresh);
    });
})();
function refreshData() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Refreshing data...");
        for (const key of exports.arrayCache) {
            const DATE_NOW = Date.now();
            if (DATE_NOW >= key.createdAt) {
                const { data } = yield (0, discord_controller_1.getUser)(key.id);
                if (typeof data === "object" && data) {
                    const findUserIndex = exports.arrayCache.findIndex((user) => user.id === key.id);
                    exports.arrayCache[findUserIndex].createdAt = DATE_NOW + exports.config.createdAt;
                    exports.arrayCache[findUserIndex].avatar = data.avatar;
                }
            }
        }
        loading = true;
        console.log("Refreshing data finished");
    });
}
