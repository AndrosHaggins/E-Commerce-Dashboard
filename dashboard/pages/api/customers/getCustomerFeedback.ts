// pages/api/customers/feedback.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
/**
 * API Route: /api/customers/getCustomerFeedback
 * 
 * This route handles fetching customer feedback data from the database.
 * It returns a JSON array of feedback objects, each including details about the customer who provided the feedback 
 * and the product the feedback is related to.
 * 
 * Example Response:
 * [
 *   {
 *     "feedbackid": "uuid",
 *     "customerid": "uuid",
 *     "productid": "uuid",
 *     "rating": 5,
 *     "feedback": "Great product!",
 *     "feedbackdate": "2023-08-21T00:00:00.000Z",
 *     "customers": {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     },
 *     "products": {
 *       "title": "Product A"
 *     }
 *   },
 *   ...
 * ]
 */
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
