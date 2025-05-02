export interface VideoInfoProps {
    title: string
    author_name: string
    author_url: string
    type: string
    height: number
    width: number
    version: string
    provider_name: string
    provider_url: string
    thumbnail_height: number
    thumbnail_width: number
    thumbnail_url: string
    html: string
}

export interface VideoProcessProps {
    success: boolean
    id: string
    content: string
    title: string
    info: {
        image: string
        title: string
    }
    repeat_download: boolean | null
    message: string | null
    cachehash: string
    additional_info: null
    progress_url: string
} 