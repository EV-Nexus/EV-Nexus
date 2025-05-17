// Mock data for development purposes
export const MOCK_BIKES = [
  {
    id: '1',
    name: 'Eco Boda Max',
    image: 'https://thefounder.africa/content/images/2024/04/Bolt-electric-bike.png',
    brand: 'Ampersand',
    type: 'passenger',
    price: 450,
    range: 80,
    availability: 'available',
    description: 'Perfect for carrying passengers through urban areas with its comfortable seat and sturdy frame. Features regenerative braking for extended range.',
    specs: {
      motor: '1500W',
      battery: '48V 20Ah',
      chargingTime: '4 hours',
      maxSpeed: '45 km/h',
      loadCapacity: '180 kg',
    },
  },
  {
    id: '2',
    name: 'Power Delivery',
    image: 'https://thefounder.africa/content/images/2024/04/Bolt-electric-bike.png',
    brand: 'Roam Air',
    type: 'delivery',
    price: 500,
    range: 90,
    availability: 'limited',
    description: 'Designed specifically for delivery services with extra storage capacity and durable construction. Features quick-swap battery system.',
    specs: {
      motor: '1800W',
      battery: '60V 30Ah',
      chargingTime: '3.5 hours',
      maxSpeed: '50 km/h',
      loadCapacity: '200 kg',
    },
  },
  {
    id: '3',
    name: 'Urban Commuter',
    image: 'https://thefounder.africa/content/images/2024/04/Bolt-electric-bike.png',
    brand: 'ARC Ride',
    type: 'standard',
    price: 400,
    range: 70,
    availability: 'available',
    description: 'Efficient and cost-effective option for daily commuting in urban environments. Lightweight design with essential features.',
    specs: {
      motor: '1200W',
      battery: '48V 15Ah',
      chargingTime: '3 hours',
      maxSpeed: '40 km/h',
      loadCapacity: '150 kg',
    },
  },
  {
    id: '4',
    name: 'Heavy Hauler',
    image: 'https://thefounder.africa/content/images/2024/04/Bolt-electric-bike.png',
    brand: 'Opibus',
    type: 'cargo',
    price: 550,
    range: 65,
    availability: 'available',
    description: 'Built for heavy cargo transport with reinforced frame and powerful motor. Includes spacious rear cargo platform.',
    specs: {
      motor: '2000W',
      battery: '72V 30Ah',
      chargingTime: '5 hours',
      maxSpeed: '35 km/h',
      loadCapacity: '250 kg',
    },
  },
  {
    id: '5',
    name: 'Eco Express',
    image: 'https://thefounder.africa/content/images/2024/04/Bolt-electric-bike.png',
    brand: 'Ampersand',
    type: 'passenger',
    price: 480,
    range: 85,
    availability: 'unavailable',
    description: 'Premium passenger model with enhanced comfort and safety features. Includes USB charging for mobile devices.',
    specs: {
      motor: '1600W',
      battery: '60V 25Ah',
      chargingTime: '4.5 hours',
      maxSpeed: '45 km/h',
      loadCapacity: '170 kg',
    },
  },
];

export const MOCK_SWAP_STATIONS = [
  {
    id: '1',
    name: 'Metro Energy Hub',
    latitude: -1.286389,
    longitude: 36.817223,
    distance: 1.2,
    batteryAvailable: 8,
    openUntil: '22:00',
    address: 'Kenyatta Avenue, Nairobi',
    phone: '+254 700 123456',
    chargingPoints: 6,
    rating: 4.7,
    facilities: [
      { name: 'Waiting Area' },
      { name: 'Convenience Store' },
      { name: 'WiFi' },
      { name: 'Restrooms' },
      { name: 'ATM' },
      { name: 'Cafe' }
    ],
    reviews: [
      {
        name: 'John M.',
        rating: 5,
        comment: 'Very quick service, staff was helpful in getting my battery swapped.',
        date: 'June 12, 2025'
      },
      {
        name: 'Sarah K.',
        rating: 4.5,
        comment: 'Clean facility with good amenities while waiting. Battery was fully charged.',
        date: 'June 8, 2025'
      },
      {
        name: 'David O.',
        rating: 4.8,
        comment: 'Always reliable, never had to wait more than 5 minutes for a swap.',
        date: 'June 5, 2025'
      }
    ]
  },
  {
    id: '2',
    name: 'GreenPower Exchange',
    latitude: -1.291389,
    longitude: 36.821223,
    distance: 2.5,
    batteryAvailable: 3,
    openUntil: '20:00',
    address: 'Moi Avenue, Nairobi',
    phone: '+254 711 234567',
    chargingPoints: 4,
    rating: 4.2,
    facilities: [
      { name: 'Waiting Area' },
      { name: 'WiFi' },
      { name: 'Restrooms' }
    ],
    reviews: [
      {
        name: 'Michael W.',
        rating: 4,
        comment: 'Good location but sometimes crowded during peak hours.',
        date: 'June 10, 2025'
      },
      {
        name: 'Jane L.',
        rating: 4.5,
        comment: 'Staff is friendly and process is quick.',
        date: 'June 3, 2025'
      }
    ]
  },
  {
    id: '3',
    name: 'Quick Swap Station',
    latitude: -1.281389,
    longitude: 36.812223,
    distance: 3.7,
    batteryAvailable: 0,
    openUntil: '23:00',
    address: 'Tom Mboya Street, Nairobi',
    phone: '+254 722 345678',
    chargingPoints: 8,
    rating: 3.9,
    facilities: [
      { name: 'Waiting Area' },
      { name: 'Convenience Store' },
      { name: 'Bike Service' },
      { name: 'WiFi' }
    ],
    reviews: [
      {
        name: 'Robert N.',
        rating: 3.5,
        comment: 'Often out of batteries in the evening. Good facility otherwise.',
        date: 'June 9, 2025'
      },
      {
        name: 'Evelyn T.',
        rating: 4,
        comment: 'Appreciate the late hours. Saved me many times.',
        date: 'June 1, 2025'
      },
      {
        name: 'George K.',
        rating: 4.2,
        comment: 'Great bike service while waiting for battery swap.',
        date: 'May 28, 2025'
      }
    ]
  },
  {
    id: '4',
    name: 'EcoBoda Power Point',
    latitude: -1.296389,
    longitude: 36.822223,
    distance: 4.1,
    batteryAvailable: 12,
    openUntil: '21:00',
    address: 'Ngara Road, Nairobi',
    phone: '+254 733 456789',
    chargingPoints: 10,
    rating: 4.8,
    facilities: [
      { name: 'Waiting Area' },
      { name: 'Cafe' },
      { name: 'WiFi' },
      { name: 'Restrooms' },
      { name: 'Bike Service' }
    ],
    reviews: [
      {
        name: 'Mary W.',
        rating: 5,
        comment: 'Best swap station in Nairobi! Always has batteries and great cafe.',
        date: 'June 11, 2025'
      },
      {
        name: 'Paul J.',
        rating: 4.7,
        comment: 'Excellent service and facility. Love the coffee while I wait.',
        date: 'June 6, 2025'
      }
    ]
  },
  {
    id: '5',
    name: 'Charging Corner',
    latitude: -1.301389,
    longitude: 36.827223,
    distance: 5.3,
    batteryAvailable: 2,
    openUntil: '19:00',
    address: 'Haile Selassie Avenue, Nairobi',
    phone: '+254 744 567890',
    chargingPoints: 3,
    rating: 3.6,
    facilities: [
      { name: 'Waiting Area' },
      { name: 'Convenience Store' }
    ],
    reviews: [
      {
        name: 'Daniel M.',
        rating: 3.5,
        comment: 'Small facility but gets the job done. Limited hours though.',
        date: 'June 7, 2025'
      },
      {
        name: 'Lucy K.',
        rating: 3.8,
        comment: 'Convenient location but could use more charging points.',
        date: 'June 2, 2025'
      }
    ]
  },
];

export const MOCK_REPAIRS = [
  {
    id: '1',
    name: 'Boda Tech Garage',
    rating: 4.8,
    distance: 2.3,
    services: ['Motor Repair', 'Battery Service', 'Electronics'],
    image: 'https://images.unsplash.com/photo-1631972241361-330c704b90f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '2',
    name: 'EV Wheel Clinic',
    rating: 4.5,
    distance: 3.7,
    services: ['Tire Service', 'Brake Repair', 'Frame Work'],
    image: 'https://images.unsplash.com/photo-1631972241361-330c704b90f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '3',
    name: 'Power Cycle Repairs',
    rating: 4.9,
    distance: 1.5,
    services: ['Battery Replacement', 'Electrical Systems', 'General Service'],
    image: 'https://images.unsplash.com/photo-1631972241361-330c704b90f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export const MOCK_USER = {
  id: '1',
  name: 'Eli Keli',
  phone: '+254 742 560540',
  currentBike: '1', // References a bike ID
  paymentDue: 450,
  nextPaymentDate: '2025-06-15',
  paymentHistory: [
    { date: '2025-06-08', amount: 450, status: 'paid' },
    { date: '2025-06-01', amount: 450, status: 'paid' },
    { date: '2025-05-25', amount: 450, status: 'paid' },
  ],
  swapHistory: [
    { date: '2025-06-10', station: 'Metro Energy Hub', batteryLevel: '20%' },
    { date: '2025-06-07', station: 'GreenPower Exchange', batteryLevel: '15%' },
    { date: '2025-06-04', station: 'Metro Energy Hub', batteryLevel: '18%' },
  ],
};

// Mock notifications data
export const NOTIFICATIONS = [
  {
    id: '1',
    type: 'payment',
    title: 'Payment Due Tomorrow',
    message: 'Your next payment of KSh 450 is due tomorrow. Please ensure you have sufficient funds in your M-Pesa account.',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    type: 'battery',
    title: 'Battery Swap Reminder',
    message: 'Your battery is running low (20%). There are 5 swap stations within 3km of your location.',
    time: '1 day ago',
    read: true,
  },
  {
    id: '3',
    type: 'maintenance',
    title: 'Maintenance Check Due',
    message: 'Your e-bike is due for its monthly maintenance check. Schedule an appointment with a nearby service partner.',
    time: '2 days ago',
    read: true,
  },
  {
    id: '4',
    type: 'promotion',
    title: 'Weekend Offer',
    message: 'Refer a friend this weekend and both of you will receive a 10% discount on your next week\'s lease payment.',
    time: '3 days ago',
    read: true,
  },
  {
    id: '5',
    type: 'system',
    title: 'App Update Available',
    message: 'A new version of EV Nexus is available with improved battery tracking and payment features.',
    time: '5 days ago',
    read: true,
  },
];