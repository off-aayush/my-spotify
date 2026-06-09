import { spotifyFetch } from "@/lib/spotify";

export async function GET() {
    try {
        const data = await spotifyFetch("/me");
        console.log(data, " User data");
        return Response.json(data);
    } catch (error) {
        return Response.json(
            { error: "Failed to fetch profile" },
            { status: 500 },
        );
    }
}
