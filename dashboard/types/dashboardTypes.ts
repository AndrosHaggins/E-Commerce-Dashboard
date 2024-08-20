// types/dashboardTypes.ts

// single general file instead of multiple files. 

export interface Customer {
    firstname: string;
    lastname: string;
  }
  
  export interface Product {
    title: string;
  }
  
  export interface FeedbackData {
    customers: Customer | null;
    products: Product | null;
    feedbackdate: string;
    rating: number;
    feedback: string;
  }
  
  export interface ProductData {
    title: string;
    stockquantity: number;
    updatedat: string;
  }
  
  export interface DailyOrder {
    date: string;
    sales: number;
  }
  
  export interface DashboardStats {
    totalRevenue: number;
    acquisitionRate: number;
    newCustomers: number;
    totalOrders: number;
    totalRevenueStatus: 'increase' | 'decrease' | undefined;
    totalRevenueChange: number;
    acquisitionRateStatus: 'increase' | 'decrease' | undefined;
    acquisitionRateChange: number;
    newCustomersStatus: 'increase' | 'decrease' | undefined;
    newCustomersChange: number;
    totalOrdersStatus: 'increase' | 'decrease' | undefined;
    totalOrdersChange: number;
  }
  