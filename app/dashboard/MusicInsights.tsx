import { getTopGenres, generateMusicPersonality } from "@/lib/spotify-insights";

type Props = {
    artists: any[];
};

export default function MusicInsights({ artists }: Props) {
    const genres = getTopGenres(artists);

    const insight = generateMusicPersonality(artists);

    return (
        <div className="h-full rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-6 text-xl font-bold">🧠 Music Insights</h2>

            <div className="space-y-6">
                <div>
                    <p className="text-zinc-500">Favorite Genre</p>

                    <p className="text-xl font-semibold">{insight.topGenre}</p>
                </div>

                <div>
                    <p className="text-zinc-500">Listener Type</p>

                    <p className="text-xl font-semibold">
                        {insight.personality}
                    </p>
                </div>

                <div>
                    <p className="text-zinc-500">Top Genres</p>

                    <div className="mt-3 flex flex-wrap gap-2">
                        {genres.map(([genre]) => (
                            <span
                                key={genre}
                                className="rounded-full bg-zinc-800 px-3 py-1 text-sm"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="text-zinc-500">AI Insight</p>

                    <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                        Your listening history suggests a strong preference for{" "}
                        {insight.topGenre}. You tend to revisit artists with
                        consistent melodic patterns and high replay value.
                    </p>
                </div>
            </div>
        </div>
    );
}
