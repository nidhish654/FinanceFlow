export type AvatarStyle = 
    | "adventurerNeutral" 
    | "botttsNeutral" 
    | "glass" 
    | "funEmoji";

export interface AvatarSelection {
    style: AvatarStyle;
    seed: string;
}
