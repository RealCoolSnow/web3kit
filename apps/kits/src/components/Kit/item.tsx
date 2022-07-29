import { KitAPI } from '@/types/api-types'
import React from 'react'

type Props = {
  kitInfo: KitAPI.KitInfo
}

const KitItem = ({ kitInfo }: Props) => {
  return <div>{kitInfo.tag}</div>
}

export default React.memo(KitItem)
