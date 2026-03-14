import { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ uuid: string }> }
) {
    const { uuid } = await params;
    const res = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`)

    const data = await res.json()

    return Response.json(data)
}