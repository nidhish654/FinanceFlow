import type { LucideIcon } from "lucide-react";

import {
    // Food
    UtensilsCrossed,
    Pizza,
    Coffee,
    Cake,
    IceCream,
    Sandwich,
    Apple,
    Beef,
    Fish,
    Beer,
    Wine,

    // Shopping
    ShoppingBag,
    ShoppingCart,
    Shirt,
    Package,
    Gift,
    Gem,
    Store,

    // Transport
    Car,
    Bus,
    Bike,
    Plane,
    Train,
    Ship,
    Fuel,
    ParkingCircle,
    MapPinned,
    Navigation,

    // Home
    Home,
    Building2,
    Bed,
    Sofa,
    Lamp,
    KeyRound,
    DoorOpen,
    Hammer,
    Wrench,
    Paintbrush,

    // Finance
    Wallet,
    Banknote,
    Coins,
    PiggyBank,
    CreditCard,
    Landmark,
    Receipt,
    Calculator,
    TrendingUp,
    TrendingDown,

    // Health
    HeartPulse,
    Pill,
    Stethoscope,
    Dumbbell,
    Hospital,
    Activity,

    // Education
    GraduationCap,
    Book,
    Notebook,
    PenTool,
    School,

    // Work
    Briefcase,
    Laptop,
    Monitor,
    ClipboardList,
    Building,

    // Technology
    Smartphone,
    Wifi,
    Tablet,
    MousePointer2,
    HardDrive,

    // Entertainment
    Gamepad2,
    Film,
    Music,
    Tv,
    Camera,
    Headphones,
    Popcorn,

    // Travel
    Map,
    Globe,
    Compass,
    Luggage,
    Ticket,

    // Lifestyle
    PawPrint,
    Baby,
    Flower2,
    Heart,
} from "lucide-react";

export interface CategoryIcon {
    value: string;
    label: string;
    icon: LucideIcon;
    keywords?: string[];
}

export interface CategoryIconGroup {
    title: string;
    icons: CategoryIcon[];
}

export const CATEGORY_ICON_GROUPS: CategoryIconGroup[] = [
    {
        title: "Food & Dining",
        icons: [
            {
                value: "utensils-crossed",
                label: "Food",
                icon: UtensilsCrossed,
                keywords: [
                    "restaurant",
                    "meal",
                    "lunch",
                    "dinner",
                    "breakfast",
                ],
            },
            {
                value: "pizza",
                label: "Pizza",
                icon: Pizza,
                keywords: [
                    "restaurant",
                    "fast food",
                    "meal",
                ],
            },
            {
                value: "coffee",
                label: "Coffee",
                icon: Coffee,
                keywords: [
                    "cafe",
                    "drink",
                    "tea",
                    "beverage",
                ],
            },
            {
                value: "cake",
                label: "Dessert",
                icon: Cake,
                keywords: [
                    "birthday",
                    "sweet",
                    "bakery",
                ],
            },
            {
                value: "ice-cream",
                label: "Ice Cream",
                icon: IceCream,
                keywords: [
                    "dessert",
                    "sweet",
                ],
            },
            {
                value: "sandwich",
                label: "Snacks",
                icon: Sandwich,
                keywords: [
                    "food",
                    "meal",
                ],
            },
            {
                value: "apple",
                label: "Fruits",
                icon: Apple,
                keywords: [
                    "healthy",
                    "groceries",
                ],
            },
            {
                value: "beef",
                label: "Meat",
                icon: Beef,
                keywords: [
                    "restaurant",
                    "food",
                ],
            },
            {
                value: "fish",
                label: "Seafood",
                icon: Fish,
                keywords: [
                    "restaurant",
                    "food",
                ],
            },
            {
                value: "beer",
                label: "Beer",
                icon: Beer,
                keywords: [
                    "drink",
                    "bar",
                    "alcohol",
                ],
            },
            {
                value: "wine",
                label: "Wine",
                icon: Wine,
                keywords: [
                    "drink",
                    "alcohol",
                ],
            },
        ],
    },

    {
        title: "Shopping",
        icons: [
            {
                value: "shopping-bag",
                label: "Shopping",
                icon: ShoppingBag,
                keywords: [
                    "purchase",
                    "buy",
                ],
            },
            {
                value: "shopping-cart",
                label: "Groceries",
                icon: ShoppingCart,
                keywords: [
                    "market",
                    "supermarket",
                ],
            },
            {
                value: "shirt",
                label: "Clothing",
                icon: Shirt,
                keywords: [
                    "fashion",
                    "dress",
                    "apparel",
                ],
            },
            {
                value: "package",
                label: "Package",
                icon: Package,
                keywords: [
                    "delivery",
                    "parcel",
                ],
            },
            {
                value: "gift",
                label: "Gift",
                icon: Gift,
                keywords: [
                    "present",
                    "birthday",
                ],
            },
            {
                value: "gem",
                label: "Jewelry",
                icon: Gem,
                keywords: [
                    "diamond",
                    "gold",
                    "luxury",
                ],
            },
            {
                value: "store",
                label: "Store",
                icon: Store,
                keywords: [
                    "mall",
                    "shop",
                ],
            },
        ],
    },

    {
        title: "Transportation",
        icons: [
            {
                value: "car",
                label: "Car",
                icon: Car,
                keywords: [
                    "vehicle",
                    "drive",
                ],
            },
            {
                value: "bus",
                label: "Bus",
                icon: Bus,
                keywords: [
                    "public transport",
                ],
            },
            {
                value: "bike",
                label: "Bike",
                icon: Bike,
                keywords: [
                    "cycle",
                ],
            },
            {
                value: "plane",
                label: "Flight",
                icon: Plane,
                keywords: [
                    "travel",
                    "airplane",
                ],
            },
            {
                value: "train",
                label: "Train",
                icon: Train,
                keywords: [
                    "railway",
                ],
            },
            {
                value: "ship",
                label: "Ship",
                icon: Ship,
                keywords: [
                    "boat",
                    "ferry",
                ],
            },
            {
                value: "fuel",
                label: "Fuel",
                icon: Fuel,
                keywords: [
                    "petrol",
                    "diesel",
                    "gas",
                ],
            },
            {
                value: "parking",
                label: "Parking",
                icon: ParkingCircle,
                keywords: [
                    "garage",
                ],
            },
            {
                value: "map-pinned",
                label: "Location",
                icon: MapPinned,
                keywords: [
                    "destination",
                    "maps",
                ],
            },
            {
                value: "navigation",
                label: "Navigation",
                icon: Navigation,
                keywords: [
                    "gps",
                ],
            },
        ],
    },

        {
        title: "Home & Living",
        icons: [
            {
                value: "home",
                label: "Home",
                icon: Home,
                keywords: ["house", "living"],
            },
            {
                value: "building",
                label: "Rent",
                icon: Building2,
                keywords: ["apartment", "lease"],
            },
            {
                value: "bed",
                label: "Bedroom",
                icon: Bed,
                keywords: ["sleep", "mattress"],
            },
            {
                value: "sofa",
                label: "Furniture",
                icon: Sofa,
                keywords: ["living room", "couch"],
            },
            {
                value: "lamp",
                label: "Lighting",
                icon: Lamp,
                keywords: ["light", "electric"],
            },
            {
                value: "key",
                label: "Keys",
                icon: KeyRound,
                keywords: ["security", "lock"],
            },
            {
                value: "door",
                label: "House",
                icon: DoorOpen,
                keywords: ["entrance"],
            },
            {
                value: "hammer",
                label: "Repair",
                icon: Hammer,
                keywords: ["tools", "construction"],
            },
            {
                value: "wrench",
                label: "Maintenance",
                icon: Wrench,
                keywords: ["service", "repair"],
            },
            {
                value: "paintbrush",
                label: "Renovation",
                icon: Paintbrush,
                keywords: ["paint", "decorate"],
            },
        ],
    },

    {
        title: "Finance",
        icons: [
            {
                value: "wallet",
                label: "Wallet",
                icon: Wallet,
                keywords: ["money", "cash"],
            },
            {
                value: "banknote",
                label: "Cash",
                icon: Banknote,
                keywords: ["currency", "income"],
            },
            {
                value: "coins",
                label: "Savings",
                icon: Coins,
                keywords: ["money", "balance"],
            },
            {
                value: "piggy-bank",
                label: "Investments",
                icon: PiggyBank,
                keywords: ["investment", "saving"],
            },
            {
                value: "credit-card",
                label: "Credit Card",
                icon: CreditCard,
                keywords: ["debit", "payment"],
            },
            {
                value: "landmark",
                label: "Bank",
                icon: Landmark,
                keywords: ["financial", "institution"],
            },
            {
                value: "receipt",
                label: "Bills",
                icon: Receipt,
                keywords: ["invoice", "payment"],
            },
            {
                value: "calculator",
                label: "Calculator",
                icon: Calculator,
                keywords: ["math", "budget"],
            },
            {
                value: "trending-up",
                label: "Profit",
                icon: TrendingUp,
                keywords: ["income", "growth"],
            },
            {
                value: "trending-down",
                label: "Loss",
                icon: TrendingDown,
                keywords: ["expense", "decline"],
            },
        ],
    },

    {
        title: "Health & Fitness",
        icons: [
            {
                value: "heart",
                label: "Health",
                icon: HeartPulse,
                keywords: ["medical", "wellness"],
            },
            {
                value: "pill",
                label: "Medicine",
                icon: Pill,
                keywords: ["pharmacy", "drugs"],
            },
            {
                value: "stethoscope",
                label: "Doctor",
                icon: Stethoscope,
                keywords: ["hospital", "clinic"],
            },
            {
                value: "hospital",
                label: "Hospital",
                icon: Hospital,
                keywords: ["medical", "emergency"],
            },
            {
                value: "activity",
                label: "Activity",
                icon: Activity,
                keywords: ["exercise", "fitness"],
            },
            {
                value: "dumbbell",
                label: "Gym",
                icon: Dumbbell,
                keywords: ["workout", "fitness"],
            },
        ],
    },

    {
        title: "Education",
        icons: [
            {
                value: "graduation-cap",
                label: "Education",
                icon: GraduationCap,
                keywords: ["college", "university"],
            },
            {
                value: "book",
                label: "Books",
                icon: Book,
                keywords: ["reading", "study"],
            },
            {
                value: "notebook",
                label: "Notebook",
                icon: Notebook,
                keywords: ["notes", "journal"],
            },
            {
                value: "pen-tool",
                label: "Stationery",
                icon: PenTool,
                keywords: ["pen", "pencil"],
            },
            {
                value: "school",
                label: "School",
                icon: School,
                keywords: ["class", "campus"],
            },
        ],
    },

    {
        title: "Work",
        icons: [
            {
                value: "briefcase",
                label: "Salary",
                icon: Briefcase,
                keywords: ["job", "office"],
            },
            {
                value: "building-office",
                label: "Office",
                icon: Building,
                keywords: ["company", "corporate"],
            },
            {
                value: "laptop",
                label: "Laptop",
                icon: Laptop,
                keywords: ["computer", "work"],
            },
            {
                value: "monitor",
                label: "Monitor",
                icon: Monitor,
                keywords: ["screen", "desktop"],
            },
            {
                value: "clipboard",
                label: "Projects",
                icon: ClipboardList,
                keywords: ["tasks", "work"],
            },
        ],
    },

    {
        title: "Technology",
        icons: [
            {
                value: "smartphone",
                label: "Phone",
                icon: Smartphone,
                keywords: ["mobile", "android", "iphone"],
            },
            {
                value: "tablet",
                label: "Tablet",
                icon: Tablet,
                keywords: ["ipad"],
            },
            {
                value: "wifi",
                label: "Internet",
                icon: Wifi,
                keywords: ["network", "broadband"],
            },
            {
                value: "mouse",
                label: "Accessories",
                icon: MousePointer2,
                keywords: ["mouse", "keyboard"],
            },
            {
                value: "hard-drive",
                label: "Storage",
                icon: HardDrive,
                keywords: ["ssd", "disk"],
            },
        ],
    },

        {
        title: "Entertainment",
        icons: [
            {
                value: "gamepad",
                label: "Gaming",
                icon: Gamepad2,
                keywords: ["games", "play", "console"],
            },
            {
                value: "film",
                label: "Movies",
                icon: Film,
                keywords: ["cinema", "movie", "theatre"],
            },
            {
                value: "music",
                label: "Music",
                icon: Music,
                keywords: ["songs", "spotify", "audio"],
            },
            {
                value: "tv",
                label: "TV",
                icon: Tv,
                keywords: ["television", "netflix"],
            },
            {
                value: "camera",
                label: "Photography",
                icon: Camera,
                keywords: ["photo", "photos"],
            },
            {
                value: "headphones",
                label: "Audio",
                icon: Headphones,
                keywords: ["music", "earphones"],
            },
            {
                value: "popcorn",
                label: "Cinema",
                icon: Popcorn,
                keywords: ["movies", "snacks"],
            },
        ],
    },

    {
        title: "Travel",
        icons: [
            {
                value: "map",
                label: "Maps",
                icon: Map,
                keywords: ["travel", "location"],
            },
            {
                value: "globe",
                label: "International",
                icon: Globe,
                keywords: ["world", "abroad"],
            },
            {
                value: "compass",
                label: "Adventure",
                icon: Compass,
                keywords: ["trip", "camping"],
            },
            {
                value: "luggage",
                label: "Luggage",
                icon: Luggage,
                keywords: ["bags", "vacation"],
            },
            {
                value: "ticket",
                label: "Tickets",
                icon: Ticket,
                keywords: ["booking", "events"],
            },
        ],
    },

    {
        title: "Lifestyle",
        icons: [
            {
                value: "paw",
                label: "Pets",
                icon: PawPrint,
                keywords: ["dog", "cat", "animals"],
            },
            {
                value: "baby",
                label: "Kids",
                icon: Baby,
                keywords: ["children", "family"],
            },
            {
                value: "flower",
                label: "Garden",
                icon: Flower2,
                keywords: ["plants", "flowers"],
            },
            {
                value: "heart-simple",
                label: "Personal",
                icon: Heart,
                keywords: ["love", "family", "relationship"],
            },
        ],
    },
];

export const CATEGORY_ICONS: CategoryIcon[] =
    CATEGORY_ICON_GROUPS.flatMap(
        (group) => group.icons
    );

export function getCategoryIcon(
    value?: string | null
): CategoryIcon {
    return (
        CATEGORY_ICONS.find(
            (icon) => icon.value === value
        ) ?? CATEGORY_ICONS[0]
    );
}

export function searchCategoryIcons(
    query: string
): CategoryIconGroup[] {
    const search = query
        .trim()
        .toLowerCase();

    if (!search) {
        return CATEGORY_ICON_GROUPS;
    }

    return CATEGORY_ICON_GROUPS.map(
        (group) => ({
            ...group,
            icons: group.icons.filter((icon) => {
                const searchable = [
                    icon.label,
                    ...(icon.keywords ?? []),
                ]
                    .join(" ")
                    .toLowerCase();

                return searchable.includes(
                    search
                );
            }),
        })
    ).filter(
        (group) => group.icons.length > 0
    );
}