import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps {
    name: string;
}

export default function UserAvatar({
    name,
}: UserAvatarProps) {
    const initials = name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <Avatar className="h-9 w-9">
            <AvatarFallback>
                {initials}
            </AvatarFallback>
        </Avatar>
    );
}