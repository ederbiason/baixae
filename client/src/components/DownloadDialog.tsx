import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { useVideoProcessing } from "@/hooks/useVideoProcessing"
import { useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface DownloadDialog {
    format: string
    open: boolean
    onClose: () => void
    videoUrl: string
}

export function DownloadDialog({ format, open, onClose, videoUrl }: DownloadDialog) {
    const { status, loading, error, startProcessing, videoTitle } = useVideoProcessing(format, videoUrl)

    useEffect(() => {
        if (open) startProcessing()
    }, [])

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="border-b pb-2.5">Baixando: {videoTitle}</DialogTitle>
                    {error && <p className="text-red-500">{error}</p>}
                </DialogHeader>

                {status?.success !== 1 ? (
                    <>
                        <p className="mb-2">{status?.text || "Iniciando..."}</p>
                        <Progress value={status?.progress! / 10} />
                    </>
                ) : (
                    <div className="space-y-4 flex flex-col">
                        <p>
                            Pronto! Vídeo processado com sucesso.
                        </p>
                        <p>
                            Clique no botão abaixo para baixar o arquivo:
                        </p>
                        <Button asChild className="self-center">
                            <a href={status.download_url!} download target="_blank" rel="noopener noreferrer">
                                <Download className="animate-bounce" />
                                Download
                            </a>
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}