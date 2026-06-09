type Props = {
    user: any;
};

export default function ProfileCard({ user }: Props) {
    return (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
                <img
                    src={
                        user.images?.[0]?.url ??
                        "https://placehold.co/300"
                    }
                    alt={user.display_name}
                    className="h-32 w-32 rounded-full border-4 border-green-500 object-cover"
                />

                <div className="flex-1">
                    <h1 className="text-4xl font-bold">
                        {user.display_name}
                    </h1>

                    <p className="mt-2 text-zinc-400">
                        {user.email}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-4">
                        <StatCard
                            label="Followers"
                            value={
                                user.followers?.total ??
                                0
                            }
                        />

                        <StatCard
                            label="Country"
                            value={user.country}
                        />

                        <StatCard
                            label="Plan"
                            value={
                                user.product ===
                                "premium"
                                    ? "Premium"
                                    : "Free"
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({
    label,
    value,
}: {
    label: string;
    value: string | number;
}) {
    return (
        <div className="rounded-xl bg-zinc-800 px-5 py-4 min-w-30">
            <div className="text-xs uppercase text-zinc-500">
                {label}
            </div>

            <div className="mt-1 text-lg font-semibold">
                {value}
            </div>
        </div>
    );
}