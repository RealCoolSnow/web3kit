import { NextApiRequest, NextApiResponse } from 'next'
import { KitAPI } from '@/types/api-types'
import { KIT_LIST_ALL } from '@/data/kit-list'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<KitAPI.HomeData>
) => {
  res.status(200).json({ kits: KIT_LIST_ALL })
}

export default handler
