import { KitAPI } from '@/types/api-types'
import React from 'react'
import KitItem from './item'

type Props = {
  kitList: KitAPI.KitInfo[]
}

const KitList = ({ kitList }: Props) => {
  const list = (kitList || []).map((item: KitAPI.KitInfo) => {
    return <KitItem kitInfo={item} key={item.tag} />
  })
  return (
    <div className="grid gap-8 grid-cols-2 md:grid-cols-4 overflow-x-auto snap-x">{list}</div>
  )
}

export default React.memo(KitList)
