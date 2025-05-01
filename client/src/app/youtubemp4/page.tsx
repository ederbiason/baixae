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
import logo from "/public/assets/logo-nome.png"
import { Download } from "lucide-react"

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
  return (
    <div className="flex flex-col gap-20 w-full">
      <div className="text-center text-xl">
        Conversor de YouTube para MP4
      </div>

      <div className="flex flex-col self-center gap-10 items-center">
        <div className="flex items-center gap-5 w-[600px] justify-center">
          <Input
            placeholder="Cole o link do vídeo aqui..."
            className="h-14 px-5"
          />
          <Button className="h-14 text-base">
            Converter
          </Button>
        </div>

        <div className="flex gap-10 items-center">
          <Image
            src={logo}
            width={250}
            height={250}
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
                      <Button className="group h-10 text-base w-fit self-end">
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
      </div>
    </div>
  )
}
