import { cookies } from "next/headers";

export async function getAccessToken() {
    const cookieStore = await cookies();

    return cookieStore.get("spotify_access_token")?.value;
}

export async function getRefreshToken() {
    const cookieStore = await cookies();

    return cookieStore.get("spotify_refresh_token")?.value;
}

export async function getTokenExpiry() {
    const cookieStore = await cookies();

    return Number(cookieStore.get("spotify_access_token_expires_at")?.value);
}
