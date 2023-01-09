import type { UserCache } from "../../types/users.js";
import { backupImages } from "../../utils/backupImages.js";
import { optimizeImages } from "../../utils/optimizeImages.js";
import { getImageBuffer, getUser } from "../services/discordServices.js";

export let usersCache: UserCache[] = [];

export const config = {
  createdAt: 86400000,
  refreshInterval: 86400000,
};

let loading = false;

const manageUsersCache = async () => {
  console.log("Refreshing data...");

  usersCache.forEach(async (user) => {
    const dateNow = Date.now();

    if (dateNow >= user.createdAt) {
      const userData = await getUser(user.id);

      if (userData) {
        const newUsers = usersCache.map(async (userCache) => {
          if (userCache.id !== user.id) return userCache;

          const imageBuffer = await getImageBuffer(userData.avatar);
          const imageOptimize = await optimizeImages({
            format: userData.format,
            file: imageBuffer,
          });
          const imageBackup = await backupImages({
            userId: userData.id,
            format: imageOptimize.format,
            file: imageOptimize.file,
          });

          return {
            ...userCache,
            avatar: {
              discordUrl: userData.avatar,
              backupUrl: imageBackup.imageUrl,
              format: imageBackup.format,
            },
            createdAt: dateNow + config.createdAt,
          };
        });

        usersCache = await Promise.all(newUsers);
      }
    }
  });

  loading = true;
  console.log("Refreshing data finished");
};

const manageCaches = async () => {
  if (!loading) await manageUsersCache();
  if (loading)
    setInterval(async () => manageUsersCache(), config.refreshInterval);
};

export default manageCaches;
