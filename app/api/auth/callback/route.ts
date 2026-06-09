import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);

        const code = url.searchParams.get("code");

        if (!code) {
            return NextResponse.json(
                { error: "Authorization code missing" },
                { status: 400 },
            );
        }

        const tokenResponse = await fetch(
            "https://accounts.spotify.com/api/token",
            {
                method: "POST",
                headers: {
                    Authorization:
                        "Basic " +
                        Buffer.from(
                            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
                        ).toString("base64"),

                    "Content-Type": "application/x-www-form-urlencoded",
                },

                body: new URLSearchParams({
                    grant_type: "authorization_code",
                    code,
                    redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
                }),
            },
        );

        const data = await tokenResponse.json();

        // console.log("TOKEN RESPONSE:", data);

        if (!tokenResponse.ok || !data.access_token) {
            return NextResponse.json(
                {
                    error: "Spotify token exchange failed",
                    spotifyResponse: data,
                },
                {
                    status: 500,
                },
            );
        }

        const redirectResponse = NextResponse.redirect(
            `${process.env.APP_URL}/dashboard`,
        );

        // const redirectResponse = NextResponse.redirect(
        //     new URL("/dashboard", req.url)
        // );

        redirectResponse.cookies.set(
            "spotify_access_token",
            data.access_token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: data.expires_in,
                path: "/",
            },
        );

        redirectResponse.cookies.set(
            "spotify_refresh_token",
            data.refresh_token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 30,
                path: "/",
            },
        );

        redirectResponse.cookies.set(
            "spotify_access_token_expires_at",
            String(Date.now() + data.expires_in * 1000),
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
            },
        );

        return redirectResponse;
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error: "Internal server error",
            },
            {
                status: 500,
            },
        );
    }
}
