from fastapi import FastAPI
import os
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import httpx
from typing import Optional

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Info(BaseModel):
    image: str
    title: str

class VideoInfo(BaseModel):
    success: bool
    id: str
    content: str
    title: str
    info: Info
    repeat_download: Optional[bool] = None
    message: Optional[str] = None
    cachehash: str
    additional_info: Optional[None] = None
    progress_url: str

class DownloadRequest(BaseModel):
    success: int
    progress: int
    download_url: str
    text: str
    message: str

@app.get("/api/download", response_model=VideoInfo)
def get_video_download_info(format: str, url: str, copyright: int = 0, api: str = str(os.getenv("YOUTUBE_DOWNLOAD_KEY", ""))) -> VideoInfo:
    api_url = os.getenv("API_DOWNLOAD_URL")

    response = httpx.get(
        api_url,
        params = {
            "copyright": copyright,
            "format": format,
            "url": url,
            "api": api
        }
    )

    data = response.json()
    print(data)

    return data