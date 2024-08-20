import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const topProducts = await prisma.orderdetails.groupBy({
      by: ['productid'],
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
    });

    const productData = await Promise.all(
      topProducts.map(async (item) => {
        // Handle the case where productid might be null
        if (!item.productid) {
          return {
            product_name: 'Unknown Product',
            total_quantity_sold: item._sum.quantity,
          };
        }

        const product = await prisma.products.findUnique({
          where: { productid: item.productid || undefined }, // Ensure it's string or undefined
          select: { title: true },
        });

        return {
          product_name: product?.title || 'Unknown Product',
          total_quantity_sold: item._sum.quantity,
        };
      })
    );

    res.status(200).json(productData);
  } catch (error) {
    console.error('Error fetching top products:', error);
    res.status(500).json({ error: 'Failed to fetch top products' });
  }
}
