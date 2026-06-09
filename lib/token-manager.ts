import { cookies } from "next/headers";
import {
    getAccessToken,
    getRefreshToken,
    getTokenExpiry,
} from "./spotify-auth";

export async function isTokenExpired() {
    const expiry = await getTokenExpiry();

    return Date.now() >= expiry;
}

export async function refreshAccessToken() {
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
        throw new Error("No refresh token found");
    }

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization:
                "Basic " +
                Buffer.from(
                    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
                ).toString("base64"),
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(`Failed to refresh token: ${JSON.stringify(data)}`);
    }

    const cookieStore = await cookies();

    cookieStore.set("spotify_access_token", data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: data.expires_in,
        path: "/",
    });

    cookieStore.set(
        "spotify_access_token_expires_at",
        String(Date.now() + data.expires_in * 1000),
        {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        },
    );

    return data.access_token;
}
// export async function getValidAccessToken() {
//     if (!(await isTokenExpired())) {
//         return await getAccessToken();
//     }

//     return await refreshAccessToken();
// }

export async function getValidAccessToken() {
    const token = await getAccessToken();

    if (!token) {
        throw new Error(
            "No Spotify access token found"
        );
    }

    if (!(await isTokenExpired())) {
        return token;
    }

    return await refreshAccessToken();
}