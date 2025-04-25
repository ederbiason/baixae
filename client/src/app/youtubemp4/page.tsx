import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import logo from "/public/assets/logo-nome.png"

export default function YoutubeMP4Page() {
  return (
    <div className="flex flex-col gap-20 w-full">
      <div className="text-center text-xl">
        Conversor de YouTube para MP4
      </div>

      <div className="flex flex-col self-center gap-10">
        <div className="flex items-center gap-5 w-[600px] justify-center">
          <Input
            placeholder="Cole o link do vídeo aqui..."
            className="h-14 px-5"
          />
          <Button className="h-14 text-base">
            Converter
          </Button>
        </div>

        <div className="flex gap-10">
          <Image
            src={logo}
            width={250}
            height={250}
            alt="Thumbnail of the video pasted in the input"
          />

          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-5">
              <Select>
                <SelectTrigger className="">
                  <SelectValue placeholder="Selecione uma qualidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Qualidades</SelectLabel>
                    <SelectItem value="apple">1080p</SelectItem>
                    <SelectItem value="banana">720p</SelectItem>
                    <SelectItem value="blueberry">480p</SelectItem>
                    <SelectItem value="grapes">360p</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="">
                  <SelectValue placeholder="Selecione uma qualidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Qualidades</SelectLabel>
                    <SelectItem value="apple">1080p</SelectItem>
                    <SelectItem value="banana">720p</SelectItem>
                    <SelectItem value="blueberry">480p</SelectItem>
                    <SelectItem value="grapes">360p</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Button className="h-14 text-base w-fit self-end">
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
