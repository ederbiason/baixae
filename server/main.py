from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import yt_dlp

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FormatInfo(BaseModel):
    format_id: str
    ext: str
    resolution: str | None
    filesize: int | None
    vcodec: str
    acodec: str

@app.get("/formats", response_model=list[FormatInfo])
def get_video_formats(url: str = Query(..., description="URL do vídeo YouTube")):
    ydl_opts = {
        'quiet': True,
        'skip_download': True,
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)
        formats = info.get("formats", [])

        result = []
        for f in formats:
            if f.get("vcodec") == "none" or f.get("acodec") == "none":  # ignora só áudio
                continue
            resolution = f.get("resolution") or f"{f.get('height')}p" if f.get("height") else "Unknown"
            result.append({
                "format_id": f["format_id"],
                "ext": f["ext"],
                "resolution": resolution,
                "filesize": f.get("filesize"),
                "vcodec": f["vcodec"],
                "acodec": f["acodec"],
            })

        return result
