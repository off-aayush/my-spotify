import {
    getCurrentUser,
    getCurrentlyPlaying,
    getRecentlyPlayed,
    getTopArtists,
    getTopTracks,
} from "@/lib/spotify";

import ProfileCard from "./ProfileCard";
import TopArtists from "./TopArtists";
import TopTracks from "./TopTracks";
import CurrentlyPlaying from "./CurrentlyPlaying";
import LastPlayed from "./LastPlayed";

export default async function DashboardPage() {
    const [
        user,
        topArtists,
        topTracks,
        currentlyPlaying,
        recentlyPlayed,
    ] = await Promise.all([
        getCurrentUser(),
        getTopArtists(),
        getTopTracks(),
        getCurrentlyPlaying(),
        getRecentlyPlayed(),
    ]);

    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <div className="mx-auto max-w-7xl p-8 space-y-8">
                <ProfileCard user={user} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <TopArtists artists={topArtists.items} />

                        <TopTracks tracks={topTracks.items} />
                    </div>

                    <div>
                        {currentlyPlaying ? (
                            <CurrentlyPlaying
                                track={currentlyPlaying}
                            />
                        ) : (
                            <LastPlayed
                                track={recentlyPlayed.items[0]}
                            />
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}