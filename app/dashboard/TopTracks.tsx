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

type TopTracksProps = {
    tracks: Track[];
};

export default function TopTracks({
    tracks,
}: TopTracksProps) {
    return (
        <div className="rounded-xl border p-5">
            <h2 className="mb-4 text-xl font-semibold">
                🎵 Top Tracks
            </h2>

            <div className="space-y-4">
                {tracks.map((track, index) => (
                    <div
                        key={track.id}
                        className="flex items-center gap-3"
                    >
                        <span className="font-bold text-muted-foreground">
                            #{index + 1}
                        </span>

                        <img
                            src={
                                track.album.images?.[0]
                                    ?.url
                            }
                            alt={track.name}
                            className="h-12 w-12 rounded-md"
                        />

                        <div>
                            <p className="font-medium">
                                {track.name}
                            </p>

                            <p className="text-sm text-muted-foreground">
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