export function Footer() {
    return (
        <footer className="w-full border-t bg-background h-14">
            <div className="mx-5 lg:mx-10 xl:mx-20 p-5 flex items-center justify-between md:text-sm lg:text-base">
                &copy; Eder Biason {new Date().getFullYear()}
            </div> 
        </footer>
    )
}