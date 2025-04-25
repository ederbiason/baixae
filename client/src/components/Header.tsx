import Image from "next/image"
import Link from "next/link"
import logo from "/public/assets/logo.png"

export function Header() {
    return (
        <header className="fixed bottom-0 md:top-0 md:bottom-auto left-0 w-full z-50 border-b">
            <nav className="mx-5 lg:mx-10 xl:mx-20 px-5 py-2 flex items-center justify-between md:text-sm lg:text-base">
                <Link href="/" className="bg-foreground rounded-full p-3">
                    <Image
                        src={logo}
                        alt="Baixaê logo"
                        width={35}
                        height={35}
                    />
                </Link>

                <div className="flex items-center gap-8">
                    <Link href="/youtubemp4" className="hover:opacity-80 hover:underline hover:underline-offset-2 hover:decoration-2">
                        YouTube to MP4
                    </Link>
                    <Link href="/youtubemp3" className="hover:opacity-80 hover:underline hover:underline-offset-2 hover:decoration-2">
                        YouTube to MP3
                    </Link>
                </div>
            </nav>
        </header>
    )
}