// pages/api/customers/feedback.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const feedback = await prisma.customerfeedback.findMany({
      include: {
        customers: {
          select: { firstname: true, lastname: true },
        },
        products: {
          select: { title: true },
        },
      },
    });
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customer feedback' });
  }
}
