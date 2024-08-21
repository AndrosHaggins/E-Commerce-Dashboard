import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
/**
 * API Route: /api/products/topProducts
 * 
 * This route handles fetching data for the top-selling products based on order quantities.
 * It returns a JSON array of product objects, each containing the product name and the total quantity sold.
 * 
 * If a product ID is null, the product name is returned as 'Unknown Product'.
 * 
 * Example Response:
 * [
 *   { "product_name": "Product A", "total_quantity_sold": 150 },
 *   { "product_name": "Unknown Product", "total_quantity_sold": 5 }
 * ]
 */
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
