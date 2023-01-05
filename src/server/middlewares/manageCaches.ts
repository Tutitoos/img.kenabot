import { usersCache } from "../../index.js";
import { backupImages } from "../../utils/backupImages.js";
import { optimizeImages } from "../../utils/optimizeImages.js";
import { getImageBuffer, getUser } from "../services/discordServices.js";

export const config = {
  createdAt: 86400000,
  refreshInterval: 86400000,
};

let loading: boolean = false;

const manageUsersCache = async () => {
  console.log("Refreshing data...");

  for (const user of usersCache) {
    const dateNow = Date.now();

    if (dateNow >= user.createdAt) {
      const userData = await getUser(user.id);

      if (!userData) continue;

      const findUserIndex = usersCache.findIndex(
        (userCache) => userCache.id === user.id
      );

      const imageBuffer = await getImageBuffer(userData.avatar);
      const imageOptimize = await optimizeImages({
        width: user.avatar.width,
        height: user.avatar.height,
        format: userData.format,
        file: imageBuffer,
      });
      const imageBackup = await backupImages({
        userId: userData.id,
        format: imageOptimize.format,
        file: imageOptimize.file,
      });

      usersCache[findUserIndex].avatar = {
        discordUrl: userData.avatar,
        backupUrl: imageBackup.imageUrl,
        format: imageBackup.format,
        width: user.avatar.width,
        height: user.avatar.height,
      };
      usersCache[findUserIndex].createdAt = dateNow + config.createdAt;
    }
  }

  loading = true;
  console.log("Refreshing data finished");
};

const manageCaches = async () => {
  if (!loading) await manageUsersCache();
  if (loading) setInterval(() => manageUsersCache(), config.refreshInterval);
};

export default manageCaches;
