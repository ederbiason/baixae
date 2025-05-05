"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import { Download } from "lucide-react"
import { useState } from "react"
import { VideoInfoProps } from "@/@types/interface"
import { DownloadDialog } from "@/components/DownloadDialog"

type VideoQualities = {
  label: string
  format: string
  value: string
}

const videoQualities: VideoQualities[] = [
  { label: 'Full HD (1080p)', format: "MP4", value: "1080" },
  { label: 'HD (720p)', format: "MP4", value: "720" },
  { label: 'SD (360p)', format: "MP4", value: "360" },
]

export default function YoutubeMP4Page() {
  const [videoInfo, setVideoInfo] = useState<VideoInfoProps | null>(null)
  const [videoUrl, setVideoUrl] = useState<string>("")
  const [downloadDialogOpen, setDownloadDialogOpen] = useState<boolean>(false)
  const [selectedFormat, setSelectedFormat] = useState<string>("")

  const handleConvert = async () => {
    try {
      const res: VideoInfoProps = await fetch(`/api/video-info?url=${videoUrl}`).then(data => data.json())

      setVideoInfo(res)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-20 w-full">
        <div className="text-center text-3xl font-bold">
          Conversor de YouTube para MP4
        </div>

        <div className="flex flex-col self-center gap-10 items-center">
          <div className="flex items-center gap-5 w-[600px] justify-center">
            <Input
              placeholder="Cole o link do vídeo aqui..."
              className="h-14 px-5"
              onChange={(e) => setVideoUrl(e.target.value)}
            />
            <Button
              className="h-14 text-base cursor-pointer"
              onClick={handleConvert}
              disabled={videoUrl === ""}
            >
              Converter
            </Button>
          </div>

          {
            videoInfo !== null && (
              <div className="flex gap-10 items-center">
                <Image
                  src={videoInfo.thumbnail_url}
                  width={videoInfo.thumbnail_width}
                  height={videoInfo.thumbnail_height}
                  alt="Thumbnail of the video pasted in the input"
                />

                <div className="border h-fit p-2 rounded-lg shadow-xs">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Qualidade</TableHead>
                        <TableHead>Formato</TableHead>
                        <TableHead className="text-center">Ação</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {videoQualities.map((quality) => (
                        <TableRow key={quality.value}>
                          <TableCell>{quality.label}</TableCell>
                          <TableCell>{quality.format}</TableCell>
                          <TableCell>
                            <Button
                              className="group h-10 text-base w-fit self-end"
                              onClick={() => {
                                setDownloadDialogOpen(true)
                                setSelectedFormat(quality.value)
                              }}
                            >
                              <Download className="group-hover:animate-bounce" />
                              Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )
          }
        </div>
      </div>

      {
        selectedFormat && (
          <DownloadDialog 
            videoUrl={videoUrl}
            format={selectedFormat}
            open={downloadDialogOpen}
            onClose={() => setDownloadDialogOpen(false)}
          />
        )
      }
    </>
  )
}
