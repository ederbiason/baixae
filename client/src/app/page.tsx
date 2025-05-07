import Image from "next/image"
import logo from "/public/assets/logo.png"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CircleGaugeIcon, Infinity, LucideIcon, ShieldCheck } from "lucide-react"

type benefitsProps = {
  icon: LucideIcon
  iconColor: string
  title: string
  description: string
}

const benefits: benefitsProps[] = [
  {
    icon: CircleGaugeIcon,
    iconColor: "text-blue-500",
    title: "Download Rápido",
    description: "Basta copiar e colar o URL na caixa de pesquisa e clicar no botão 'converter' para baixar e salvar MP4 e MP3"
  },
  {
    icon: Infinity,
    iconColor: "text-red-500",
    title: "Conversões sem Limite",
    description: "Nosso serviço oferece conversão ilimitada do YouTube e download de MP3 e MP4 sem limite de comprimento e sem custo"
  },
  {
    icon: ShieldCheck,
    iconColor: "text-green-500",
    title: "Totalmente Seguro",
    description: "Os vídeos baixados são completamente livres de vírus e totalmente seguros, livre de anúncios"
  }
]

export default function Home() {
  return (
    <section className="w-full flex items-center flex-col self-center">
      <Image
        src={logo}
        alt="Baixae logo"
        width={100}
        height={100}
      />
      <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Baixaê!</h1>
      <h2 className="text-xl font-bold mb-4">O melhor conversor de videos do YouTube</h2>

      <div className="flex gap-5 mt-5">
        {benefits.map((benefit, index) => (
          <Card className={`w-[300px] h-fit ${index === 0 || index === 2 ? "mt-6" : ""}`} key={index}>
            <CardHeader>
              <benefit.icon size={150} className={`w-full self-center hover:animate-bounce duration-300 ${benefit.iconColor}`} />
              <CardTitle>
                {benefit.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {benefit.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
