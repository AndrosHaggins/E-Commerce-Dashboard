import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const customerAcquisitions = await prisma.customeracquisition.groupBy({
      by: ['acquisitionsourceid'],
      _count: {
        acquisitionid: true,
      },
      orderBy: {
        _count: {
          acquisitionid: 'desc',
        },
      },
    });

    const data = await Promise.all(
      customerAcquisitions.map(async (item) => {
        // Handle the case where acquisitionsourceid might be null
        if (!item.acquisitionsourceid) {
          return {
            sourcename: 'Unknown',
            customer_count: item._count.acquisitionid,
          };
        }

        const source = await prisma.acquisitionsources.findUnique({
          where: { acquisitionsourceid: item.acquisitionsourceid || undefined }, // Ensure it's string or undefined
          select: { sourcename: true },
        });

        return {
          sourcename: source?.sourcename || 'Unknown',
          customer_count: item._count.acquisitionid,
        };
      })
    );

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching customer acquisition sources:', error);
    res.status(500).json({ error: 'Failed to fetch customer acquisition sources' });
  }
}
