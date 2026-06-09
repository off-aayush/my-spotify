import { formatDistanceToNow } from "date-fns";

type Props = {
    track: any;
};

export default function LastPlayed({
    track,
}: Props) {
    const song = track.track;

    return (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-6 text-2xl font-bold">
                🕒 Last Played
            </h2>

            <img
                src={
                    song.album.images?.[0]
                        ?.url
                }
                alt={song.name}
                className="aspect-square w-full rounded-3xl object-cover shadow-2xl"
            />

            <div className="mt-6">
                <h3 className="text-2xl font-bold">
                    {song.name}
                </h3>

                <p className="mt-2 text-zinc-400">
                    {song.artists
                        .map(
                            (
                                artist: any,
                            ) =>
                                artist.name,
                        )
                        .join(", ")}
                </p>

                <p className="mt-6 text-sm text-zinc-500">
                    Played{" "}
                    {formatDistanceToNow(
                        new Date(
                            track.played_at,
                        ),
                        {
                            addSuffix: true,
                        },
                    )}
                </p>
            </div>
        </div>
    );
}