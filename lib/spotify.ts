import { getValidAccessToken } from "./token-manager";

export async function spotifyFetch(endpoint: string) {
    const token = await getValidAccessToken();

    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.json();
}

export async function getCurrentUser() {
    return spotifyFetch("/me");
}
