import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const url = searchParams.get("url")
  
    const res = await fetch(`${process.env.API_BACKEND_URL}/api/video-info?url=${url}`)
    const data = await res.json()
  
    return NextResponse.json(data)
  }