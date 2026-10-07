import type { NextApiRequest, NextApiResponse } from 'next';

import type { IResponseData } from '@/types/gobal';
import logger from '@/utils/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseData>
) {
  switch (req.method) {
    case 'GET':
      try {
        const unixTime: number = Math.floor(Date.now() / 1000);
        const data: object = {
          sig: `${process.env.DEPLOY_ENV}.${process.env.DEPLOY_BUILD_ID}.${process.env.DEPLOY_GIT_COMMIT_ID}`,
          time: unixTime
        };
        res.status(200).end(JSON.stringify(data));
      } catch (error) {
        logger.error(error, 'Error');
        res.status(500).json({ error: 'Internal Server Error' });
      }

      break;
    default:
      res.status(405).json({ error: 'Method Not Allowed' });
  }
}
