"use client";

import { useEffect, useState } from "react";

type Props = {
    artists: any[];
    tracks: any[];
};

export default function MusicPanel({ artists, tracks }: Props) {
    const [tab, setTab] = useState("artists");

    return (
        <div className="h-full rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-6 flex gap-2">
                <button
                    onClick={() => setTab("artists")}
                    className={`rounded-full px-4 py-2 ${
                        tab === "artists"
                            ? "bg-green-500 text-black"
                            : "bg-zinc-800"
                    }`}
                >
                    Artists
                </button>

                <button
                    onClick={() => setTab("tracks")}
                    className={`rounded-full px-4 py-2 ${
                        tab === "tracks"
                            ? "bg-green-500 text-black"
                            : "bg-zinc-800"
                    }`}
                >
                    Tracks
                </button>
            </div>

            <div className="space-y-0">
                {tab === "artists"
                    ? artists.map((artist, idx) => (
                          <ArtistRow
                              key={artist.id}
                              artist={artist}
                              rank={idx + 1}
                          />
                      ))
                    : tracks.map((track, idx) => (
                          <TrackRow
                              key={track.id}
                              track={track}
                              rank={idx + 1}
                          />
                      ))}
            </div>
        </div>
    );
}

function ArtistRow({ artist, rank }: any) {
    return (
        <div className="flex items-center gap-4 rounded-xl p-3 hover:bg-zinc-800">
            <div className="relative">
                <img
                    src={artist.images?.[0]?.url}
                    className="h-14 w-14 rounded-full"
                />

                <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-black">
                    {rank}
                </div>
            </div>

            <div>
                <p className="font-semibold">{artist.name}</p>

                <p className="text-xs text-zinc-400">
                    {artist.genres?.slice(0, 2).join(" • ")}
                </p>
            </div>
        </div>
    );
}

function TrackRow({ track, rank }: any) {
    return (
        <div className="flex items-center gap-4 rounded-xl p-3 hover:bg-zinc-800">
            <div className="relative">
                <img
                    src={track.album.images?.[0]?.url}
                    className="h-14 w-14 rounded-xl"
                />

                <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-black">
                    {rank}
                </div>
            </div>

            <div>
                <p className="font-semibold">{track.name}</p>

                <p className="text-xs text-zinc-400">
                    {track.artists.map((a: any) => a.name).join(", ")}
                </p>
            </div>
        </div>
    );
}
