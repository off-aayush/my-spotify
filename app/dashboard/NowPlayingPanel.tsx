"use client";

import { useEffect, useMemo, useState } from "react";
import { formatDistanceToNow } from "date-fns";

type Props = {
    currentlyPlaying: any;
    lastPlayed: any;
};

function formatTime(ms: number) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function NowPlayingPanel({
    currentlyPlaying: initialCurrent,
    lastPlayed: initialLast,
}: Props) {
    const [currentlyPlaying, setCurrentlyPlaying] = useState(initialCurrent);

    const [lastPlayed, setLastPlayed] = useState(initialLast);

    const song = currentlyPlaying?.item;

    const [currentProgress, setCurrentProgress] = useState(
        currentlyPlaying?.progress_ms ?? 0,
    );

    /*
     * Update progress every second
     */
    useEffect(() => {
        if (!currentlyPlaying || !song) return;

        setCurrentProgress(currentlyPlaying.progress_ms);

        const interval = setInterval(() => {
            setCurrentProgress((prev: number) => {
                const next = prev + 1000;

                return Math.min(next, song.duration_ms);
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [
        currentlyPlaying?.item?.id,
        currentlyPlaying?.progress_ms,
        song?.duration_ms,
    ]);

    /*
     * Sync with Spotify every 15 seconds
     */
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const response = await fetch("/api/currently-playing", {
                    cache: "no-store",
                });

                const data = await response.json();

                setCurrentlyPlaying(data.currentlyPlaying);

                setLastPlayed(data.lastPlayed);

                if (data.currentlyPlaying) {
                    setCurrentProgress(data.currentlyPlaying.progress_ms);
                }
            } catch (err) {
                console.error(err);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const image = currentlyPlaying
        ? currentlyPlaying.item.album.images?.[0]?.url
        : lastPlayed?.track?.album?.images?.[0]?.url;

    const title = currentlyPlaying
        ? currentlyPlaying.item.name
        : lastPlayed?.track?.name;

    const artists = currentlyPlaying
        ? currentlyPlaying.item.artists
        : lastPlayed?.track?.artists;

    const duration = currentlyPlaying?.item?.duration_ms ?? 0;

    const progress = useMemo(() => {
        if (!duration) return 0;

        return (currentProgress / duration) * 100;
    }, [currentProgress, duration]);

    return (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-4 flex items-center gap-2">
                <div
                    className={`h-2 w-2 rounded-full ${
                        currentlyPlaying
                            ? "animate-pulse bg-green-500"
                            : "bg-zinc-500"
                    }`}
                />

                <span className="font-semibold">
                    {currentlyPlaying ? "Listening Now" : "Last Played"}
                </span>
            </div>

            <img
                src={image}
                alt={title}
                className="aspect-square w-full rounded-3xl object-cover shadow-2xl"
            />

            <div className="mt-6">
                <h2 className="text-3xl font-bold">{title}</h2>

                <p className="mt-2 text-zinc-400">
                    {artists?.map((a: any) => a.name).join(", ")}
                </p>
            </div>

            {currentlyPlaying ? (
                <div className="mt-6">
                    <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                        <div
                            className="h-full rounded-full bg-green-500 transition-[width] duration-1000 linear"
                            style={{
                                width: `${progress}%`,
                            }}
                        />
                    </div>

                    <div className="mt-2 flex justify-between text-sm text-zinc-500">
                        <span>{formatTime(currentProgress)}</span>

                        <span>{formatTime(duration)}</span>
                    </div>
                </div>
            ) : (
                <p className="mt-10 text-sm text-zinc-500">
                    Played{" "}
                    {lastPlayed?.played_at &&
                        formatDistanceToNow(new Date(lastPlayed.played_at), {
                            addSuffix: true,
                        })}
                </p>
            )}
        </div>
    );
}
