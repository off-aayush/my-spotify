export function getTopGenres(artists: any[]) {
    const counts: Record<string, number> = {};

    artists.forEach((artist) => {
        artist.genres?.forEach((genre: string) => {
            counts[genre] = (counts[genre] ?? 0) + 1;
        });
    });

    return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
}

export function generateMusicPersonality(artists: any[]) {
    const genres = getTopGenres(artists);

    const topGenre = genres[0]?.[0] ?? "Unknown";

    let personality = "Balanced Listener";

    if (topGenre.includes("rock")) {
        personality = "Adrenaline Seeker";
    }

    if (topGenre.includes("pop")) {
        personality = "Trend Explorer";
    }

    if (topGenre.includes("electronic")) {
        personality = "Night Owl";
    }

    if (topGenre.includes("classical")) {
        personality = "Deep Thinker";
    }

    return {
        topGenre,
        personality,
        genres,
    };
}
