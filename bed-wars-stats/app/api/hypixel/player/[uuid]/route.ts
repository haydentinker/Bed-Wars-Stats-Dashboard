import { NextRequest } from "next/server";
const API_KEY = process.env.HYPIXEL_API_KEY
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ uuid: string }> }
) {
    const { uuid } = await params;
    const res = await fetch(`https://api.hypixel.net/v2/player?uuid=${uuid}`, {
        method: 'GET',
        headers: {
            'API-Key': API_KEY ?? "",
            'Accept': 'application/json'
        }
    });

    const data = await res.json()
    console.log(data)
    return Response.json(data)
}