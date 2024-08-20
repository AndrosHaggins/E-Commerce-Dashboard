// pages/api/stats/getDashboardStats.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

// Helper functions to get counts for current and previous months
async function getCustomerAcquisitionsCount(startDate: Date, endDate: Date) {
  return await prisma.customeracquisition.count({
    where: {
      acquisitiondate: {
        gte: startDate,
        lt: endDate,
      },
    },
  });
}

async function getOrdersCount(startDate: Date, endDate: Date) {
  return await prisma.orders.count({
    where: {
      orderdate: {
        gte: startDate,
        lt: endDate,
      },
    },
  });
}

async function getTotalRevenue(startDate: Date, endDate: Date): Promise<number> {
    const result = await prisma.orders.aggregate({
      _sum: { totalamount: true },
      where: {
        orderdate: {
          gte: startDate,
          lt: endDate,
        },
      },
    });
  
    // Convert the Prisma Decimal to a JavaScript number
    return result._sum.totalamount ? result._sum.totalamount.toNumber() : 0.00;
  }
// Helper function to calculate percentage change
function calculatePercentageChange(current: number, previous: number) {
  if (previous === 0) return 100; // Consider 100% increase if there was no value previously
  return ((current - previous) / previous) * 100;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Define current and previous month ranges
    const currentStartDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const previousStartDate = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
    const previousEndDate = new Date(new Date().getFullYear(), new Date().getMonth(), 0); // Last day of the previous month

    // Get stats for current month
    const currentTotalRevenue = await getTotalRevenue(currentStartDate, new Date());
    const currentNewCustomers = await getCustomerAcquisitionsCount(currentStartDate, new Date());
    const currentTotalOrders = await getOrdersCount(currentStartDate, new Date());
    const currentInitialCustomers = await getCustomerAcquisitionsCount(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), currentStartDate);
    const currentAcquisitionRate = currentInitialCustomers > 0 
      ? (currentNewCustomers / currentInitialCustomers) * 100 
      : 0;

    // Get stats for previous month
    const previousTotalRevenue = await getTotalRevenue(previousStartDate, previousEndDate);
    const previousNewCustomers = await getCustomerAcquisitionsCount(previousStartDate, previousEndDate);
    const previousTotalOrders = await getOrdersCount(previousStartDate, previousEndDate);
    const previousInitialCustomers = await getCustomerAcquisitionsCount(new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1), previousStartDate);

    const previousAcquisitionRate = previousInitialCustomers > 0 
      ? (previousNewCustomers / previousInitialCustomers) * 100 
      : 0;

   
    // Calculate percentage changes
    const revenueChange = calculatePercentageChange(currentTotalRevenue, previousTotalRevenue);
    const ordersChange = calculatePercentageChange(currentTotalOrders, previousTotalOrders);
    const newCustomersChange = calculatePercentageChange(currentNewCustomers, previousNewCustomers);
    const acquisitionRateChange = calculatePercentageChange(currentAcquisitionRate, previousAcquisitionRate);

    // Format and round numbers before returning
    res.status(200).json({
      totalRevenue: currentTotalRevenue.toFixed(2), // Rounded to 2 decimal places
      totalRevenueChange: revenueChange.toFixed(2), // Rounded to 2 decimal places
      totalRevenueStatus: revenueChange >= 0 ? 'increase' : 'decrease',

      newCustomers: Math.round(currentNewCustomers), // Rounded to nearest whole number
      newCustomersChange: Math.round(newCustomersChange), // Rounded to nearest whole number
      newCustomersStatus: newCustomersChange >= 0 ? 'increase' : 'decrease',

      totalOrders: Math.round(currentTotalOrders), // Rounded to nearest whole number
      totalOrdersChange: Math.round(ordersChange), // Rounded to nearest whole number
      totalOrdersStatus: ordersChange >= 0 ? 'increase' : 'decrease',

      acquisitionRate: Math.round(currentAcquisitionRate), // Rounded to nearest whole number
      acquisitionRateChange: Math.round(acquisitionRateChange), // Rounded to nearest whole number
      acquisitionRateStatus: acquisitionRateChange >= 0 ? 'increase' : 'decrease',
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
}
