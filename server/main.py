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

class YouTubeVideoInfo(BaseModel): 
    title: str
    author_name: str
    author_url: str
    type: str
    height: int
    width: int
    version: str
    provider_name: str
    provider_url: str
    thumbnail_height: int
    thumbnail_width: int
    thumbnail_url: str
    html: str

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

class VideoDownloadInfo(BaseModel):
    success: int
    progress: int
    download_url: Optional[str] = None
    text: Optional[str] = None

@app.get("/api/video-process", response_model=VideoInfo)
def get_video_process_info(format: str, url: str, copyright: int = 0) -> VideoInfo:
    api_url = os.getenv("API_DOWNLOAD_INFO")
    api_key = os.getenv("YOUTUBE_DOWNLOAD_KEY")

    response = httpx.get(
        api_url,
        params = {
            "copyright": copyright,
            "format": format,
            "url": url,
            "api": api_key
        }
    )

    data: VideoInfo = response.json()

    return data

@app.get("/api/video-info", response_model=YouTubeVideoInfo)
def get_youtube_video_info(url: str) -> YouTubeVideoInfo:
    api_url = "https://www.youtube.com/oembed"
    
    response = httpx.get(
        api_url,
        params = {
            "url": url,
            "format": "json"
        }
    )

    data: YouTubeVideoInfo = response.json()

    return data

@app.get("/api/download", response_model=VideoDownloadInfo)
def get_video_download_url(id: str) -> VideoDownloadInfo:
    api_url = os.getenv("API_DOWNLOAD_URL")

    response = httpx.get(
        api_url,
        params = {
            "id": id
        }
    )

    data: VideoDownloadInfo = response.json()
    
    return data