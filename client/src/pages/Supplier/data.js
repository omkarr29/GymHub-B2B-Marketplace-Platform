// Shared mock data for the Supplier Module.
// In a real backend-connected build this would come from API calls;
// centralizing it here keeps every supplier page consistent for now.

export const supplierProducts = [
  {
    id: 'sp-1',
    name: 'Commercial Motorized Treadmill X9',
    category: 'Cardio Equipment',
    price: 145000,
    stock: 18,
    sku: 'FP-TRD-X9',
    minOrderQty: 1,
    status: 'Active',
    orders: 24,
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'sp-2',
    name: 'Commercial Spin Bike Pro',
    category: 'Cardio Equipment',
    price: 45000,
    stock: 6,
    sku: 'FP-SPN-PRO',
    minOrderQty: 2,
    status: 'Active',
    orders: 31,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'sp-3',
    name: 'Percussion Massage & Foam Roller Recovery Kit',
    category: 'Recovery Equipment',
    price: 24500,
    stock: 42,
    sku: 'FP-REC-KIT',
    minOrderQty: 1,
    status: 'Active',
    orders: 12,
    image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'sp-4',
    name: 'Commercial Elliptical Cross Trainer',
    category: 'Cardio Equipment',
    price: 98000,
    stock: 0,
    sku: 'FP-ELL-CT2',
    minOrderQty: 1,
    status: 'Out of Stock',
    orders: 9,
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'sp-5',
    name: 'Heavy-Duty Rowing Machine',
    category: 'Cardio Equipment',
    price: 62000,
    stock: 3,
    sku: 'FP-ROW-HD1',
    minOrderQty: 1,
    status: 'Pending',
    orders: 0,
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=500&auto=format&fit=crop&q=60',
  },
];

export const supplierOrders = [
  {
    id: 'SORD-4471',
    customer: 'Alpha Fitness Club',
    contactPerson: 'Rohan Malhotra',
    phone: '+91 98765 43210',
    products: [{ name: 'Commercial Motorized Treadmill X9', qty: 2, unitPrice: 145000 }],
    amount: 290000,
    payment: 'Paid',
    status: 'Processing',
    date: 'Aug 18, 2026',
    deliveryAddress: '14, MG Road, Andheri East, Mumbai, Maharashtra 400069',
  },
  {
    id: 'SORD-4460',
    customer: 'PowerHouse Gym Chain',
    contactPerson: 'Sana Iyer',
    phone: '+91 90000 11223',
    products: [{ name: 'Commercial Spin Bike Pro', qty: 4, unitPrice: 45000 }],
    amount: 180000,
    payment: 'Paid',
    status: 'Shipped',
    date: 'Aug 14, 2026',
    deliveryAddress: '221, Residency Road, Bengaluru, Karnataka 560025',
  },
  {
    id: 'SORD-4432',
    customer: 'CoreFit Studios',
    contactPerson: 'Vikram Shah',
    phone: '+91 98111 22334',
    products: [{ name: 'Percussion Massage & Foam Roller Recovery Kit', qty: 3, unitPrice: 24500 }],
    amount: 73500,
    payment: 'Paid',
    status: 'Delivered',
    date: 'Aug 05, 2026',
    deliveryAddress: '9, Park Street, Kolkata, West Bengal 700016',
  },
  {
    id: 'SORD-4410',
    customer: 'Alpha Fitness Club',
    contactPerson: 'Rohan Malhotra',
    phone: '+91 98765 43210',
    products: [{ name: 'Commercial Elliptical Cross Trainer', qty: 1, unitPrice: 98000 }],
    amount: 98000,
    payment: 'Pending',
    status: 'Pending',
    date: 'Jul 29, 2026',
    deliveryAddress: '14, MG Road, Andheri East, Mumbai, Maharashtra 400069',
  },
];

export const buyers = [
  {
    name: 'Alpha Fitness Club',
    contact: 'Rohan Malhotra • procurement@alphafitness.in',
    ordersCount: 6,
    totalPurchase: 612000,
    lastOrder: 'Aug 18, 2026',
  },
  {
    name: 'PowerHouse Gym Chain',
    contact: 'Sana Iyer • purchasing@powerhousegym.in',
    ordersCount: 4,
    totalPurchase: 480000,
    lastOrder: 'Aug 14, 2026',
  },
  {
    name: 'CoreFit Studios',
    contact: 'Vikram Shah • ops@corefitstudios.in',
    ordersCount: 2,
    totalPurchase: 143500,
    lastOrder: 'Aug 05, 2026',
  },
];

export const conversations = [
  {
    id: 'conv-1',
    buyer: 'Alpha Fitness Club',
    lastMessage: 'Can you confirm delivery timeline for the treadmill order?',
    time: '10:24 AM',
    unread: true,
    messages: [
      { from: 'buyer', text: 'Hi, we placed an order for 2 treadmills (SORD-4471). Any update on dispatch?', time: '9:58 AM' },
      { from: 'buyer', text: 'Can you confirm delivery timeline for the treadmill order?', time: '10:24 AM' },
    ],
  },
  {
    id: 'conv-2',
    buyer: 'PowerHouse Gym Chain',
    lastMessage: 'Thanks, received the spin bikes in good condition.',
    time: 'Yesterday',
    unread: false,
    messages: [
      { from: 'buyer', text: 'Are the spin bikes on the way?', time: 'Aug 13, 2026' },
      { from: 'supplier', text: 'Yes, dispatched today via our logistics partner. ETA 2 days.', time: 'Aug 13, 2026' },
      { from: 'buyer', text: 'Thanks, received the spin bikes in good condition.', time: 'Aug 15, 2026' },
    ],
  },
  {
    id: 'conv-3',
    buyer: 'CoreFit Studios',
    lastMessage: 'Do you offer bulk pricing on recovery kits above 10 units?',
    time: '3 days ago',
    unread: true,
    messages: [
      { from: 'buyer', text: 'Do you offer bulk pricing on recovery kits above 10 units?', time: '3 days ago' },
    ],
  },
];

export const getStatusBadge = (status) => {
  const map = {
    Processing: { bg: '#fed1b0', text: '#79573d' },
    Shipped: { bg: '#57b3ca33', text: '#00687a' },
    Delivered: { bg: '#dcfce7', text: '#15803d' },
    Pending: { bg: '#f3e6de', text: '#857468' },
    Cancelled: { bg: '#fde2e2', text: '#ba1a1a' },
    Active: { bg: '#dcfce7', text: '#15803d' },
    'Out of Stock': { bg: '#fde2e2', text: '#ba1a1a' },
    'In Stock': { bg: '#dcfce7', text: '#15803d' },
    'Low Stock': { bg: '#fed1b0', text: '#79573d' },
  };
  return map[status] || { bg: '#ede0d9', text: '#211a16' };
};
