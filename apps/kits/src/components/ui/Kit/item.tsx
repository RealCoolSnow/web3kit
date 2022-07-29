import { KitAPI } from '@/types/api-types'
import { useTranslation } from 'next-i18next'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  kitInfo: KitAPI.KitInfo
}

const KitItem = ({ kitInfo }: Props) => {
  const { t } = useTranslation(['common'])
  return (
    <Link href={`/kit/${kitInfo.tag}`}>
      <div className="flex flex-col items-center">
        <div className="w-12 h-12">
          <Image
            src={require(`@/assets/kit/${kitInfo.icon}`)}
            alt={t(`kit.${kitInfo.tag}.name`)}
          />
        </div>
        <span>{t(`kit.${kitInfo.tag}.name`)}</span>
        <span className="text-gray-500">{t(`kit.${kitInfo.tag}.desc`)}</span>
      </div>
    </Link>
  )
}

export default React.memo(KitItem)
