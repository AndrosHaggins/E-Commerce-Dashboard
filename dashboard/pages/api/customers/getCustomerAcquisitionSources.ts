import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
/**
 * API Route: /api/customers/getCustomerAcquisitionSources
 * 
 * This route handles fetching customer acquisition data grouped by acquisition sources.
 * It returns a JSON array of objects, each containing a source name and the number of customers acquired through that source.
 * 
 * If an acquisition source ID is null, the source name is returned as 'Unknown'.
 * 
 * Example Response:
 * [
 *   { "sourcename": "Google Ads", "customer_count": 120 },
 *   { "sourcename": "Facebook Ads", "customer_count": 95 },
 *   { "sourcename": "Unknown", "customer_count": 5 }
 * ]
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Group customer acquisitions by acquisition source, counting the number of acquisitions per source
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
    // Map through the grouped data and attach the source name from acquisitionsources table
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
