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
import logo from "/public/assets/logo-nome.png"

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
  return (
    <div className="flex flex-col gap-20 w-full">
      <div className="text-center text-3xl font-bold">
        Conversor de YouTube para MP3
      </div>

      <div className="flex flex-col self-center gap-10 items-center">
        <div className="flex items-center gap-5 self-center w-[600px] justify-center">
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
                {audioQualities.map((audio) => (
                  <TableRow key={audio.label}>
                    <TableCell>{audio.label}</TableCell>
                    <TableCell>{audio.format}</TableCell>
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
