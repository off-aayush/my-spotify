import { NextResponse } from "next/server";

export async function GET() {
    const scopes = [
        // Just discovered Scopes, and these are really helpful to access multiple data about the user
        "user-read-private", // Gets me my Country code and subscription tier
        "user-read-email",
        "user-top-read",
        "user-read-recently-played",
        "user-read-currently-playing",
        "user-library-read",
    ];

    const params = new URLSearchParams({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID!,
        scope: scopes.join(" "),
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
    });

    return NextResponse.redirect(
        `https://accounts.spotify.com/authorize?${params}`,
    );
}
