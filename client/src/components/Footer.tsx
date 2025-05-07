import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full border-t bg-background mt-5">
            <div className="mx-5 lg:mx-10 xl:mx-20 py-3 flex items-center justify-between md:text-sm lg:text-base">
                <span>
                    &copy; Eder Biason {new Date().getFullYear()}
                </span>

                <div className="flex items-center gap-3">
                    <Link href="https://www.linkedin.com/in/eder-biason-b0a7b920b/" target="_blank" className="rounded-full p-2 hover:bg-foreground hover:text-white">
                        <Linkedin />
                    </Link>

                    <Link href="https://github.com/ederbiason" target="_blank" className="rounded-full p-2 hover:bg-foreground hover:text-white">
                        <Github />
                    </Link>
                </div>
            </div> 
        </footer>
    )
}