type Artist = {
    id: string;
    name: string;
    images: {
        url: string;
    }[];
    genres: string[];
};

export default function TopArtists({
    artists,
}: {
    artists: Artist[];
}) {
    return (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-6 text-2xl font-bold">
                🎤 Top Artists
            </h2>

            <div className="space-y-4">
                {artists.map((artist, index) => (
                    <div
                        key={artist.id}
                        className="group flex items-center gap-4 rounded-2xl p-3 transition-all hover:bg-zinc-800"
                    >
                        <div className="relative">
                            <img
                                src={
                                    artist.images?.[0]
                                        ?.url
                                }
                                alt={artist.name}
                                className="h-16 w-16 rounded-full object-cover"
                            />

                            <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-black">
                                {index + 1}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold group-hover:text-green-400">
                                {artist.name}
                            </h3>

                            <p className="text-sm text-zinc-400">
                                {artist.genres
                                    ?.slice(
                                        0,
                                        3,
                                    )
                                    .join(
                                        " • ",
                                    )}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}