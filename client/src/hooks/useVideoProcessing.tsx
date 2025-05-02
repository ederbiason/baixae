import { VideoProcessProps } from "@/@types/interface"
import { useState, useCallback } from "react"

type VideoStatus = {
  success: number
  progress: number
  download_url: string | null
  text: string
}

export function useVideoProcessing(format: string, url: string) {
  const [status, setStatus] = useState<VideoStatus | null>(null)
  const [loading, setLoading] = useState(false)
  const [videoTitle, setVideoTitle] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const startProcessing = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/video-process?format=${format}&url=${encodeURIComponent(url)}`)
      const { id, title }: VideoProcessProps = await res.json()

      setVideoTitle(title)

      const poll = async () => {
        const downloadRes = await fetch(`/api/download?id=${id}`)
        const data: VideoStatus = await downloadRes.json()
        setStatus(data)

        if (data.success === 1) return
        setTimeout(poll, 2000) 
      }

      poll()
    } catch (err) {
      console.error(err)
      setError("Erro ao processar vídeo.")
    } finally {
      setLoading(false)
    }
  }, [format, url])

  return { status, loading, error, startProcessing, videoTitle }
}