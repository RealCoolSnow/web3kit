import { NextApiRequest, NextApiResponse } from 'next'

const apiUrl = ''

/**
 * doc: https://docs.gopluslabs.io/reference/token-security-api-response-detail/contract-security
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const chain_id = req.query.chain_id || 1
  const contract_addresses = ((req.query.contract_addresses || '') as string).toLowerCase()
  const resp = await fetch(
    `https://api.gopluslabs.io/api/v1/token_security/${chain_id}?contract_addresses=${contract_addresses}`
  )
  const data = await resp.json()

  res.status(200).json({
    code: data.code == 1 ? 0 : data.code,
    msg: data.message,
    data: data.code == 1 ? data.result[contract_addresses] : {},
  })
}
