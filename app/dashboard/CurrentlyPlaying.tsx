type Props = {
    track: any;
};

function formatTime(ms: number) {
    const minutes = Math.floor(
        ms / 60000,
    );

    const seconds = Math.floor(
        (ms % 60000) / 1000,
    );

    return `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
}

export default function CurrentlyPlaying({
    track,
}: Props) {
    const song = track.item;

    const progress =
        (track.progress_ms /
            song.duration_ms) *
        100;

    return (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-6 text-2xl font-bold">
                🎧 Currently Playing
            </h2>

            <img
                src={
                    song.album.images?.[0]
                        ?.url
                }
                alt={song.name}
                className="aspect-square w-full rounded-3xl object-cover shadow-2xl"
            />

            <div className="mt-6">
                <h3 className="text-2xl font-bold">
                    {song.name}
                </h3>

                <p className="mt-2 text-zinc-400">
                    {song.artists
                        .map(
                            (
                                artist: any,
                            ) =>
                                artist.name,
                        )
                        .join(", ")}
                </p>
            </div>

            <div className="mt-6">
                <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                    <div
                        className="h-full rounded-full bg-green-500"
                        style={{
                            width: `${progress}%`,
                        }}
                    />
                </div>

                <div className="mt-2 flex justify-between text-sm text-zinc-500">
                    <span>
                        {formatTime(
                            track.progress_ms,
                        )}
                    </span>

                    <span>
                        {formatTime(
                            song.duration_ms,
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
}