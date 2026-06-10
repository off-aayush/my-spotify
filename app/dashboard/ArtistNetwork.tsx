type Props = {
    artists: any[];
};

export default function ArtistNetwork({ artists }: Props) {
    const center = artists[0];

    const others = artists.slice(1);

    return (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 h-full">
            <h2 className="text-xl font-bold mb-6">Artist Network</h2>

            <div className="relative h-125 flex items-center justify-center">
                {/* Center artist */}

                <div className="absolute z-10 flex flex-col items-center">
                    <img
                        src={center.images?.[0]?.url}
                        className="w-28 h-28 rounded-full border-4 border-green-500"
                    />

                    <p className="mt-2 font-semibold">{center.name}</p>
                </div>

                {/* Surrounding artists */}

                {others.map((artist, index) => {
                    const positions = [
                        "top-6 left-1/2 -translate-x-1/2",
                        "top-1/2 left-8 -translate-y-1/2",
                        "top-1/2 right-8 -translate-y-1/2",
                        "bottom-6 left-1/2 -translate-x-1/2",
                    ];

                    return (
                        <div
                            key={artist.id}
                            className={`absolute ${positions[index]} flex flex-col items-center`}
                        >
                            <img
                                src={artist.images?.[0]?.url}
                                className="w-20 h-20 rounded-full border border-zinc-700"
                            />

                            <p className="mt-2 text-sm">{artist.name}</p>
                        </div>
                    );
                })}

                {/* SVG Lines */}

                <svg className="absolute inset-0 w-full h-full">
                    <line
                        x1="50%"
                        y1="50%"
                        x2="50%"
                        y2="15%"
                        stroke="#22c55e"
                    />

                    <line
                        x1="50%"
                        y1="50%"
                        x2="15%"
                        y2="50%"
                        stroke="#22c55e"
                    />

                    <line
                        x1="50%"
                        y1="50%"
                        x2="85%"
                        y2="50%"
                        stroke="#22c55e"
                    />

                    <line
                        x1="50%"
                        y1="50%"
                        x2="50%"
                        y2="85%"
                        stroke="#22c55e"
                    />
                </svg>
            </div>
        </div>
    );
}
