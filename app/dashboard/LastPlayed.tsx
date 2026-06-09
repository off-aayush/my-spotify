import { formatDistanceToNow } from "date-fns";

type LastPlayedProps = {
    track: {
        played_at: string;
        track: {
            name: string;
            artists: {
                name: string;
            }[];
            album: {
                images: {
                    url: string;
                }[];
            };
        };
    };
};

export default function LastPlayed({
    track,
}: LastPlayedProps) {
    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="mb-4 text-xl font-semibold">
                🕒 Last Played
            </h2>

            <img
                src={track.track.album.images?.[0]?.url}
                alt={track.track.name}
                className="mb-4 w-full rounded-lg"
            />

            <h3 className="font-bold text-lg">
                {track.track.name}
            </h3>

            <p className="text-zinc-400">
                {track.track.artists
                    .map((artist) => artist.name)
                    .join(", ")}
            </p>

            <p className="mt-4 text-sm text-zinc-500">
                Played{" "}
                {formatDistanceToNow(
                    new Date(track.played_at),
                    {
                        addSuffix: true,
                    }
                )}
            </p>
        </div>
    );
}