import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch all orders within the desired range
    const orders = await prisma.orders.findMany({
      select: {
        orderdate: true,
      },
    });

    // Group orders by date (ignoring time)
    const dailyOrders = orders.reduce((acc, order) => {
      if (order.orderdate) { // Ensure orderdate is not null
        const dateOnly = order.orderdate.toISOString().split('T')[0]; // Extract date part only
        if (!acc[dateOnly]) {
          acc[dateOnly] = 0;
        }
        acc[dateOnly]++;
      }
      return acc;
    }, {} as Record<string, number>);

    // Format the result to match the expected output format
    const formattedData = Object.entries(dailyOrders).map(([date, count]) => ({
      date,
      sales: count,
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch daily orders data' });
  }
}
