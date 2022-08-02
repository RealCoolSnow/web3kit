export interface TokenDetectionItem {
  tag: string
  chainId: number
}

export const TOKEN_DETECTION_LIST: TokenDetectionItem[] = [
  {
    tag: 'ethereum',
    chainId: 1,
  },
  {
    tag: 'cronos',
    chainId: 25,
  },
  {
    tag: 'bsc',
    chainId: 56,
  },
  {
    tag: 'okx',
    chainId: 66,
  },
  {
    tag: 'heco',
    chainId: 128,
  },
  {
    tag: 'polygon',
    chainId: 137,
  },
  {
    tag: 'fantom',
    chainId: 250,
  },
  {
    tag: 'arbitrum',
    chainId: 42161,
  },
  {
    tag: 'avax-c',
    chainId: 43114,
  },
  {
    tag: 'harmony',
    chainId: 1666600000,
  },
]
