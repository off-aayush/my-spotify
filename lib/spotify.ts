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

export async function getTopArtists() {
    return spotifyFetch(
        "/me/top/artists?limit=5&time_range=medium_term"
    );
}

export async function getTopTracks() {
    return spotifyFetch(
        "/me/top/tracks?limit=5&time_range=medium_term"
    );
}

export async function getRecentlyPlayed() {
    return spotifyFetch(
        "/me/player/recently-played?limit=1"
    );
}

export async function getCurrentlyPlaying() {
    const token = await getValidAccessToken();

    const response = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        }
    );

    if (response.status === 204) {
        return null;
    }

    if (!response.ok) {
        return null;
    }

    return response.json();
}