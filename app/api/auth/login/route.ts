import { NextResponse } from "next/server";

export async function GET() {
    const scopes = [
        "user-read-email",
        "user-top-read",
        "user-read-recently-played",
        "user-read-currently-playing",
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
