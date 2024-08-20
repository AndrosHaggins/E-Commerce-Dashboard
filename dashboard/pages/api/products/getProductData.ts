// pages/api/products/getProductData.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

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
