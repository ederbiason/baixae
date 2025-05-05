"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Download } from "lucide-react"
import { VideoInfoProps } from "@/@types/interface"
import { useState } from "react"
import { DownloadDialog } from "@/components/DownloadDialog"

type AudioQualities = {
  label: string
  format: string
  value: string
}

const audioQualities: AudioQualities[] = [
  { label: '320kbps', format: "MP3", value: "mp3" },
  { label: '256kbps', format: "MP3", value: "mp3" },
  { label: '128kbps', format: "MP3", value: "mp3" },
]

export default function YoutubeMP3Page() {
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
          Conversor de YouTube para MP3
        </div>

        <div className="flex flex-col self-center gap-10 items-center">
          <div className="flex items-center gap-5 self-center w-[600px] justify-center">
            <Input
              placeholder="Cole o link do vídeo aqui..."
              className="h-14 px-5"
              onChange={(e) => setVideoUrl(e.target.value)}
            />
            <Button
              className="h-14 text-base"
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
                      {audioQualities.map((quality) => (
                        <TableRow key={quality.label}>
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
