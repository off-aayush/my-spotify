export async function GET(req: Request) {
    const url = new URL(req.url);

    const code = url.searchParams.get("code");

    const response = await fetch("https://accounts.spotify.com/api/token", {
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
            code: code!,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
        }),
    });

    const data = await response.json();

    console.log("TOKEN RESPONSE:", data);

    return Response.json(data);
}
