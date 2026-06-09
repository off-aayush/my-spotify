type Track = {
    id: string;
    name: string;
    album: {
        images: {
            url: string;
        }[];
    };
    artists: {
        name: string;
    }[];
};

export default function TopTracks({
    tracks,
}: {
    tracks: Track[];
}) {
    return (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-6 text-2xl font-bold">
                🎵 Top Tracks
            </h2>

            <div className="space-y-4">
                {tracks.map((track, index) => (
                    <div
                        key={track.id}
                        className="group flex items-center gap-4 rounded-2xl p-3 transition-all hover:bg-zinc-800"
                    >
                        <div className="relative">
                            <img
                                src={
                                    track.album
                                        .images?.[0]
                                        ?.url
                                }
                                alt={track.name}
                                className="h-16 w-16 rounded-xl object-cover"
                            />

                            <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-black">
                                {index + 1}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold group-hover:text-green-400">
                                {track.name}
                            </h3>

                            <p className="text-sm text-zinc-400">
                                {track.artists
                                    .map(
                                        (
                                            artist,
                                        ) =>
                                            artist.name,
                                    )
                                    .join(
                                        ", ",
                                    )}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}