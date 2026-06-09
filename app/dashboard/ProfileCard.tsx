type ProfileCardProps = {
    user: {
        display_name: string;
        email: string;
        country: string;
        product: string;
        followers?: {
            total: number;
        };
        images?: {
            url: string;
        }[];
    };
};

export default function ProfileCard({ user }: ProfileCardProps) {
    return (
        <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center gap-5">
                <img
                    src={user.images?.[0]?.url ?? "https://placehold.co/100"}
                    alt={user.display_name}
                    className="h-24 w-24 rounded-full object-cover"
                />

                <div>
                    <h1 className="text-3xl font-bold">{user.display_name}</h1>

                    <p className="text-muted-foreground">{user.email}</p>

                    <div className="mt-3 flex gap-4 text-sm">
                        <span>🌍 {user.country}</span>

                        <span>👥 {user.followers?.total ?? 0} followers</span>

                        <span>🎵 {user.product}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
