import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = await cookies();

    cookieStore.delete("spotify_access_token");
    cookieStore.delete("spotify_refresh_token");
    cookieStore.delete("spotify_access_token_expires_at");

    return Response.redirect(new URL("/", "http://127.0.0.1:3000"));
}
