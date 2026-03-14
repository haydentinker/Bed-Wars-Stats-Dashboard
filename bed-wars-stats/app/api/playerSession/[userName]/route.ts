import { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ userName: string }> }
) {
    const { userName } = await params;
    const res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${userName}`)

    const data = await res.json()

    return Response.json(data)
}