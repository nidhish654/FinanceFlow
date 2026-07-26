import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DataCardProps {
    children: ReactNode;
    className?: string;
}

// export default function DataCard({
//     children,
//     className,
// }: DataCardProps) {
//     return (
//         <div
//             className={cn(
//                 "rounded-xl border bg-card p-5 shadow-sm transition-all duration-200",
//                 "hover:-translate-y-0.5 hover:shadow-md",
//                 className
//             )}
//         >
//             {children}
//         </div>
//     );
// }

export default function DataCard({
    children,
    className,
}: DataCardProps) {
    return (
        <div
            className={`rounded-xl border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${className ?? ""}`}
        >
            {children}
        </div>
    );
}