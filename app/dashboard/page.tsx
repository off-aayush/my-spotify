import {
    getArtist,
    getCurrentUser,
    getCurrentlyPlaying,
    getRecentlyPlayed,
    getTopArtists,
    getTopArtistsWithDetails,
    getTopTracks,
} from "@/lib/spotify";
import MusicPanel from "./MusicPanel";
import NowPlayingPanel from "./NowPlayingPanel";
import ProfileHero from "./ProfileHero";
import MusicInsights from "./MusicInsights";
import ArtistNetwork from "./ArtistNetwork";

export default async function DashboardPage() {
    const [user, topArtists, topTracks, currentlyPlaying, recentlyPlayed] =
        await Promise.all([
            getCurrentUser(),
            getTopArtists(),
            getTopTracks(),
            getCurrentlyPlaying(),
            getRecentlyPlayed(),
        ]);

    const detailedArtists = await getTopArtistsWithDetails();

    // console.log(topArtists, " topArtists");
    // console.log(JSON.stringify(topArtists.items[0], null, 2), " topArtists");

    const artist = await getArtist(topArtists.items[0].id);

    console.log(JSON.stringify(artist, null, 2), " artist");

    return (
        <main className="min-h-screen bg-zinc-950 text-white p-6">
            <div className="max-w-5xl mx-auto space-y-6">
                <ProfileHero user={user} />
                {/* 
                <div className="grid lg:grid-cols-6 gap-6">
                    <div className="lg:col-span-2">
                        <MusicPanel
                            artists={topArtists.items}
                            tracks={topTracks.items}
                        />
                    </div>
                    <div className="lg:col-span-2">
                        <NowPlayingPanel
                            currentlyPlaying={currentlyPlaying}
                            lastPlayed={recentlyPlayed.items[0]}
                        />
                    </div>
                </div> */}

                <div className="grid lg:grid-cols-6 gap-6">
                    <div className="lg:col-span-2">
                        <MusicPanel
                            artists={topArtists.items}
                            tracks={topTracks.items}
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <NowPlayingPanel
                            currentlyPlaying={currentlyPlaying}
                            lastPlayed={recentlyPlayed.items[0]}
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <ArtistNetwork artists={topArtists.items} />
                    </div>
                </div>
            </div>
        </main>
    );
}
