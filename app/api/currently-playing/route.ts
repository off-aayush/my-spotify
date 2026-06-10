// app/api/currently-playing/route.ts

import {
    getCurrentlyPlaying,
    getRecentlyPlayed,
} from "@/lib/spotify";

export async function GET() {
    const currentlyPlaying = await getCurrentlyPlaying();

    if (currentlyPlaying) {
        return Response.json({
            currentlyPlaying,
            lastPlayed: null,
        });
    }

    const recent = await getRecentlyPlayed();

    return Response.json({
        currentlyPlaying: null,
        lastPlayed: recent.items?.[0] ?? null,
    });
}