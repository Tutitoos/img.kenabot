import axios, { AxiosError, AxiosResponse } from "axios";

const { DISCORD_API_URL, DISCORD_TOKEN } = process.env;

function catchError(error: AxiosError): {
    success: boolean;
    data: string;
} {
    return {
        success: false,
        data: error.message,
    };
}

export function getUser(id: string) {
    return axios
        .request({
            method: "GET",
            url: `${DISCORD_API_URL}/users/${id}`,
            headers: {
                Authorization: `Bot ${DISCORD_TOKEN}`,
            },
        })
        .then(async (response: AxiosResponse) => {
            if (response.status !== 200) throw response;
            const { data } = response;
            const avatarBuffer = await createAvatarBuffer(`https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`)
            return {
                success: true,
                data: {
                    id: data.id,
                    avatar: avatarBuffer.success ? avatarBuffer.data : null,
                },
            };
        })
        .catch(catchError);
}

async function createAvatarBuffer(avatar: string) {
    return axios
        .request({
            method: "GET",
            url: avatar,
            responseType: "arraybuffer"
        })
        .then(async (response: AxiosResponse) => {
            if (response.status !== 200) throw response;
            const { data } = response;
            return {
                success: true,
                data,
            };
        })
        .catch(catchError);
}