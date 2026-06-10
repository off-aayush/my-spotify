type Props = {
    user: any;
};

export default function QuickStats({
    user,
}: Props) {
    return (
        <div className="grid grid-cols-3 gap-4">
            <StatCard
                title="Followers"
                value={
                    user.followers?.total ??
                    0
                }
            />

            <StatCard
                title="Country"
                value={user.country}
            />

            <StatCard
                title="Plan"
                value={
                    user.product ===
                    "premium"
                        ? "Premium"
                        : "Free"
                }
            />
        </div>
    );
}

function StatCard({
    title,
    value,
}: {
    title: string;
    value: string | number;
}) {
    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
            <p className="text-sm text-zinc-500">
                {title}
            </p>

            <p className="mt-2 text-2xl font-bold">
                {value}
            </p>
        </div>
    );
}