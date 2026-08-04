"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AvatarSelection, AvatarStyle } from "../types/avatar";
import { AVATAR_STYLE_LABELS, AVATAR_STYLES_LIST } from "../lib/avatar-styles";
import { AVATAR_SEEDS } from "../lib/avatar-seeds";
import { generateAvatar } from "../lib/avatar-utils";

interface AvatarPickerDialogProps {
    onSelect: (avatar: AvatarSelection) => void;
    currentSeed?: string;
    currentStyle?: AvatarStyle;
}

export function AvatarPickerDialog({
    onSelect,
    currentSeed,
    currentStyle = "adventurerNeutral",
}: AvatarPickerDialogProps) {
    const [open, setOpen] = useState(false);
    const [selectedSeed, setSelectedSeed] = useState<string | undefined>(currentSeed);
    const [selectedStyle, setSelectedStyle] = useState<AvatarStyle>(currentStyle);

    useEffect(() => {
        if (open) {
            setSelectedSeed(currentSeed);
            setSelectedStyle(currentStyle);
        }
    }, [open, currentSeed, currentStyle]);

    const generatedAvatars = useMemo(() => {
        return AVATAR_SEEDS.map((seed) => ({
            seed,
            dataUri: generateAvatar({ style: selectedStyle, seed }),
        }));
    }, [selectedStyle]);

    const handleSave = () => {
        if (!selectedSeed) return;

        onSelect({
            style: selectedStyle,
            seed: selectedSeed,
        });

        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary">Change Avatar</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Choose Your Avatar</DialogTitle>
                </DialogHeader>

                {/* Avatar Style Picker */}
                <div className="flex flex-wrap gap-2">
                    {AVATAR_STYLES_LIST.map((style) => (
                        <Button
                            key={style}
                            size="sm"
                            variant={selectedStyle === style ? "default" : "outline"}
                            onClick={() => setSelectedStyle(style)}
                        >
                            {AVATAR_STYLE_LABELS[style]}
                        </Button>
                    ))}
                </div>

                {/* Avatar Grid */}
                <ScrollArea className="h-[340px] rounded-lg border p-4">
                    <div className="grid grid-cols-4 gap-5 sm:grid-cols-6">
                        {generatedAvatars.map(({ seed, dataUri }) => (
                            <button
                                key={seed}
                                type="button"
                                onClick={() => setSelectedSeed(seed)}
                                className={`relative h-14 w-14 overflow-hidden rounded-full transition-all duration-200 hover:scale-110 ${selectedSeed === seed
                                    ? "ring-2 ring-primary ring-offset-2 shadow-md"
                                    : "border border-border hover:border-primary/40"
                                    }`}
                            >
                                <Image
                                    src={dataUri}
                                    alt={seed}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </ScrollArea>

                <DialogFooter className="flex-row-reverse sm:justify-between">
                    <Button onClick={handleSave}>Save</Button>
                    <Button
                        variant="ghost"
                        onClick={() => {
                            setSelectedSeed(currentSeed);
                            setSelectedStyle(currentStyle);
                            setOpen(false);
                        }}
                    >
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}