import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function YoutubeMP3Page() {
  return (
    <div className="flex flex-col gap-20 w-full">
      <div className="text-center text-xl">
        Conversor de YouTube para MP3
      </div>

      <div className="flex items-center gap-5 self-center w-[600px] justify-center">
        <Input 
          placeholder="Cole o link do vídeo aqui..."
          className="h-14 px-5"
        />
        <Button className="h-14 text-base">
          Converter
        </Button>
      </div>
    </div>
  )
  }
  