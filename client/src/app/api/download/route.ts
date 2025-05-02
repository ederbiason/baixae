import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: NextRequest) {
    const { searchParams } = new URL(req.url)

    const id = searchParams.get("id")

    const res = await fetch(`${process.env.API_BACKEND_URL}/api/download?id=${id}`)
    const data = await res.json()

    return NextResponse.json(data)
}
