export function AboutFooter() {
    return (
        <div className="flex flex-col items-center justify-center space-y-2 pb-12 pt-8 text-center text-sm text-muted-foreground">
            <p>
                &copy; {new Date().getFullYear()} FinanceFlow. Designed & Developed by Nidhish Shettigar.
            </p>
            <p className="text-xs opacity-70">
                Built with ❤️ using Next.js &bull; TypeScript &bull; Prisma &bull; PostgreSQL
            </p>
        </div>
    );
}
