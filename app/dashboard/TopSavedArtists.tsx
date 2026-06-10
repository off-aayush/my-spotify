"use client";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from "recharts";

type ArtistData = {
    artist: string;
    tracks: number;
};

type Props = {
    artists: ArtistData[];
};

const COLORS = [
    "#1DB954",
    "#34D399",
    "#10B981",
    "#059669",
    "#047857",
    "#065F46",
];

export default function TopSavedArtistsChart({
    artists,
}: Props) {
    const totalTracks = artists.reduce(
        (sum, artist) => sum + artist.tracks,
        0
    );

    const favoriteArtist = artists[0];

    return (
        <div className="h-full rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-6">
                <p className="text-sm text-zinc-400">
                    Music Library
                </p>

                <h2 className="text-xl font-bold">
                    Top Saved Artists
                </h2>
            </div>

            <div className="relative h-64">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={artists}
                            dataKey="tracks"
                            innerRadius={70}
                            outerRadius={100}
                            strokeWidth={0}
                        >
                            {artists.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={
                                        COLORS[
                                            index %
                                                COLORS.length
                                        ]
                                    }
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold">
                        {totalTracks}
                    </span>

                    <span className="text-sm text-zinc-400">
                        saved tracks
                    </span>
                </div>
            </div>

            <div className="mt-6 rounded-2xl bg-zinc-800/50 p-4">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                    Most Saved Artist
                </p>

                <p className="mt-2 text-lg font-semibold">
                    {favoriteArtist.artist}
                </p>

                <p className="text-green-400">
                    {favoriteArtist.tracks} tracks
                </p>
            </div>

            <div className="mt-5 space-y-3">
                {artists.slice(0, 5).map((artist, idx) => (
                    <div
                        key={artist.artist}
                        className="flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="h-3 w-3 rounded-full"
                                style={{
                                    backgroundColor:
                                        COLORS[idx],
                                }}
                            />

                            <span className="text-sm">
                                {artist.artist}
                            </span>
                        </div>

                        <span className="text-sm text-zinc-500">
                            {Math.round(
                                (artist.tracks /
                                    totalTracks) *
                                    100
                            )}
                            %
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}