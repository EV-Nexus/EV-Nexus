export interface SwapStation {
    id: string;
    name: string;
    address: string;
    distance: number;
    available: number;
    total: number;
    price: number;
    openHours: string;
    lat?: number;
    lng?: number;
}

export interface SwapCardProps {
    name: string;
    address: string;
    distance: number;
    available: number;
    total: number;
    price: number;
    openHours: string;
    onNavigate?: () => void;
}