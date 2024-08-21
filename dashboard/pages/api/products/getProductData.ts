// pages/api/products/getProductData.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
/**
 * API Route: /api/products/getProductData
 * 
 * This route handles fetching product data from the database.
 * It returns a JSON array of product objects, each containing details such as product ID, title, stock quantity, and last update timestamp.
 * 
 * Example Response:
 * [
 *   {
 *     "productid": "uuid",
 *     "title": "Product A",
 *     "stockquantity": 50,
 *     "updatedat": "2023-08-21T00:00:00.000Z"
 *   },
 *   ...
 * ]
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const products = await prisma.products.findMany({
      select: {
        productid: true,
        title: true,
        stockquantity: true,
        updatedat: true,
        // Include other columns as needed
      },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product data' });
  }
}
