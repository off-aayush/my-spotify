type Artist = {
    id: string;
    name: string;
    images: {
        url: string;
    }[];
    genres: string[];
};

type TopArtistsProps = {
    artists: Artist[];
};

export default function TopArtists({ artists }: TopArtistsProps) {
    return (
        <div className="rounded-xl border p-5">
            <h2 className="mb-4 text-xl font-semibold">🎤 Top Artists</h2>

            <div className="space-y-4">
                {artists.map((artist, index) => (
                    <div key={artist.id} className="flex items-center gap-3">
                        <span className="font-bold text-muted-foreground">
                            #{index + 1}
                        </span>

                        <img
                            src={artist.images?.[0]?.url}
                            alt={artist.name}
                            className="h-12 w-12 rounded-full"
                        />

                        <div>
                            <p className="font-medium">{artist.name}</p>

                            <p className="text-xs text-muted-foreground">
                                {artist.genres?.slice(0, 2).join(", ")}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
