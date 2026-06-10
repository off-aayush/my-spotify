type Props = {
    user: any;
};

export default function ProfileHero({
    user,
}: Props) {
    return (
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-linear-to-r from-green-950 via-zinc-900 to-black p-8">
            <div className="absolute inset-0 opacity-20">
                <div className="h-full w-full bg-[radial-gradient(circle_at_top_left,#1DB954,transparent_40%)]" />
            </div>

            <div className="relative flex items-center gap-6">
                <img
                    src={
                        user.images?.[0]?.url ??
                        "https://placehold.co/300"
                    }
                    alt={user.display_name}
                    className="h-32 w-32 rounded-full border-4 border-green-500 object-cover shadow-xl"
                />

                <div>
                    <h1 className="text-5xl font-bold">
                        {user.display_name}
                    </h1>

                    <p className="mt-2 text-zinc-400">
                        {user.email}
                    </p>

                    <div className="mt-4 flex gap-2">
                        <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold text-black">
                            {user.product ===
                            "premium"
                                ? "Premium"
                                : "Free"}
                        </span>

                        <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm">
                            {user.country}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}