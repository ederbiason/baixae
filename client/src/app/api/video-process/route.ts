import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)

    const format = searchParams.get("format")
    const url = searchParams.get("url")

    const res = await fetch(`${process.env.API_BACKEND_URL}/api/video-process?format=${format}&url=${url}`)
    const data = await res.json()

    return NextResponse.json(data)
}
