import "dotenv/config";
import { getUser } from "./controllers/discord.controller";
import { server } from "./server";
import { UsersCache } from "./types/users";

export let arrayCache: UsersCache[] = [];

export const delay = async (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

let loading: boolean = false;

(async function () {
    await server();
    if (!loading) await refreshData();
    if (loading) setInterval(() => refreshData(), 86400000);
})();


async function refreshData() {
    console.log("Refreshing data...");
    for (const key of arrayCache) {
        const DATE_NOW = Date.now();
        if (DATE_NOW >= key.createdAt) {
            const { data } = await getUser(key.id);
            if (typeof data === "object" && data) {
                const findUserIndex = arrayCache.findIndex((user: UsersCache) => user.id === key.id);
                arrayCache[findUserIndex].createdAt = DATE_NOW + 86400000;
                arrayCache[findUserIndex].avatar = data.avatar;
            }
        }
    }
    loading = true;
    console.log("Refreshing data finished");
}