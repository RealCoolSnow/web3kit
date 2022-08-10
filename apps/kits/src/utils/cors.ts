import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

export const initCors = async (req: NextApiRequest, res: NextApiResponse) =>
  NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  })
