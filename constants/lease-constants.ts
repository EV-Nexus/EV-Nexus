
export interface EvBike {
    id: number;
    name: string;
    image: string;
    price: number;
    range: number;
    batterySwap: boolean;
    category: 'economy' | 'standard' | 'premium';
    features: BikeFeature[];
}

export interface BikeFeature {
    icon: React.ReactNode;
    label: string;
}

export interface LeaseDetails {
    bikeId: number;
    duration: number;
    paymentMethod: string;
    totalCost: number;
}

export interface RiderInfo {
    fullName: string;
    idNumber: string;
    phoneNumber: string;
    occupation: string;
}

export const LEASE_STEPS = [
    'bikes',      // Step 1: Select a bike
    'details',    // Step 2: Choose lease details
    'info',       // Step 3: Enter rider info
    'confirm',    // Step 4: Confirm lease
    'success'     // Step 5: Success page
];

export const LEASE_DURATIONS = [
    { value: 1, label: '1 Day', suffix: '/day' },
    { value: 7, label: '7 Days', suffix: '/week' },
    { value: 30, label: '30 Days', suffix: '/month' }
];

export const PAYMENT_METHODS = [
    { id: 'mpesa', name: 'M-Pesa', icon: '💳' }
];