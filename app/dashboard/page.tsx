import { getCurrentUser } from "@/lib/spotify";

export default async function DashboardPage() {
    const user = await getCurrentUser();

    return (
        <main className="min-h-screen bg-zinc-950 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <ProfileCard user={user} />
            </div>
        </main>
    );
}

function ProfileCard({ user }: any) {
    return (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
            <div className="flex items-center gap-6">
                <img
                    src={
                        user.images?.[0]?.url ??
                        "https://placehold.co/300"
                    }
                    alt={user.display_name}
                    className="w-32 h-32 rounded-full"
                />

                <div>
                    <h1 className="text-4xl font-bold">
                        {user.display_name}
                    </h1>

                    <p className="text-zinc-400 mt-2">
                        {user.email}
                    </p>

                    <div className="flex gap-3 mt-4">
                        <StatCard
                            label="Followers"
                            value={user.followers?.total ?? 0}
                        />

                        <StatCard
                            label="Country"
                            value={user.country}
                        />

                        <StatCard
                            label="Plan"
                            value={
                                user.product === "premium"
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
        <div className="bg-zinc-800 px-4 py-3 rounded-xl">
            <div className="text-sm text-zinc-400">
                {label}
            </div>

            <div className="font-semibold">
                {value}
            </div>
        </div>
    );
}