type CurrentlyPlayingProps = {
    track: {
        item: {
            name: string;
            duration_ms: number;
            artists: {
                name: string;
            }[];
            album: {
                images: {
                    url: string;
                }[];
            };
        };
        progress_ms: number;
    };
};

export default function CurrentlyPlaying({
    track,
}: CurrentlyPlayingProps) {
    const progress =
        (track.progress_ms /
            track.item.duration_ms) *
        100;

    return (
        <div className="rounded-xl border p-5">
            <h2 className="mb-4 text-xl font-semibold">
                🎧 Currently Playing
            </h2>

            <img
                src={
                    track.item.album.images?.[0]
                        ?.url
                }
                alt={track.item.name}
                className="mb-4 w-full rounded-lg"
            />

            <h3 className="text-lg font-bold">
                {track.item.name}
            </h3>

            <p className="text-muted-foreground">
                {track.item.artists
                    .map(
                        (artist) =>
                            artist.name,
                    )
                    .join(", ")}
            </p>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                <div
                    className="h-full bg-green-500"
                    style={{
                        width: `${progress}%`,
                    }}
                />
            </div>
        </div>
    );
}