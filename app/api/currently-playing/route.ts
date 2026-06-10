// app/api/currently-playing/route.ts

import {
    getCurrentlyPlaying,
    getRecentlyPlayed,
    getPlayerState,
} from "@/lib/spotify";

export async function GET() {
    const [currentlyPlaying, player] = await Promise.all([
        getCurrentlyPlaying(),
        getPlayerState(),
    ]);

    if (currentlyPlaying) {
        return Response.json({
            currentlyPlaying,
            lastPlayed: null,
            device: player?.device ?? null,
        });
    }

    const recent = await getRecentlyPlayed();

    return Response.json({
        currentlyPlaying: null,
        lastPlayed: recent.items?.[0] ?? null,
        device: player?.device ?? null,
    });
}