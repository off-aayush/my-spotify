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
    return spotifyFetch("/me/top/artists?limit=5&time_range=medium_term");
}

export async function getTopTracks() {
    return spotifyFetch("/me/top/tracks?limit=5&time_range=medium_term");
}

export async function getRecentlyPlayed() {
    return spotifyFetch("/me/player/recently-played?limit=1");
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

export async function getArtist(artistId: string) {
    return spotifyFetch(`/artists/${artistId}`);
}

export async function getTopArtistsWithDetails() {
    const topArtists = await getTopArtists();

    const artists = await Promise.all(
        topArtists.items.map((artist: any) => getArtist(artist.id)),
    );

    return artists;
}

export async function getSavedTracks(limit = 50, offset = 0) {
    return spotifyFetch(`/me/tracks?limit=${limit}&offset=${offset}`);
}

export async function getAllSavedTracks() {
    const allTracks: any[] = [];

    let offset = 0;
    const limit = 50;

    while (true) {
        const data = await getSavedTracks(limit, offset);

        allTracks.push(...data.items);

        if (data.items.length < limit) {
            break;
        }

        offset += limit;

        // optional safety cap
        if (offset >= 500) {
            break;
        }
    }

    return allTracks;
}

export async function getTopSavedArtists(topN = 8) {
    const tracks = await getAllSavedTracks();

    const artistCounts: Record<string, number> = {};

    tracks.forEach((item) => {
        item.track.artists.forEach((artist: any) => {
            artistCounts[artist.name] = (artistCounts[artist.name] || 0) + 1;
        });
    });

    return Object.entries(artistCounts)
        .map(([artist, tracks]) => ({
            artist,
            tracks,
        }))
        .sort((a, b) => b.tracks - a.tracks)
        .slice(0, topN);
}
