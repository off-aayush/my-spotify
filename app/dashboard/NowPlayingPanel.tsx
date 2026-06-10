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
    currentlyPlaying,
    lastPlayed,
}: Props) {
    const active = currentlyPlaying ?? lastPlayed?.track;

    const song = currentlyPlaying?.item;

    const progress = (currentlyPlaying?.progress_ms / song?.duration_ms) * 100;

    const image = currentlyPlaying
        ? currentlyPlaying.item.album.images[0]?.url
        : lastPlayed.track.album.images[0]?.url;

    const title = currentlyPlaying
        ? currentlyPlaying.item.name
        : lastPlayed.track.name;

    const artists = currentlyPlaying
        ? currentlyPlaying.item.artists
        : lastPlayed.track.artists;

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
                    {artists.map((a: any) => a.name).join(", ")}
                </p>
            </div>

            {/* Green progress bar from the bottom */}

            {currentlyPlaying ? (
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
                        <span>{formatTime(currentlyPlaying?.progress_ms)}</span>

                        <span>{formatTime(song?.duration_ms)}</span>
                    </div>
                </div>
            ) : (
                <p className="mt-10 text-sm text-zinc-500">

                    Played{" "}
                    {formatDistanceToNow(new Date(lastPlayed.played_at), {
                        addSuffix: true,
                    })}
                </p>
            )}
        </div>
    );
}
