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
      <div className="flex flex-col items-center cursor-pointer border border-gray-200 rounded-md shadow p-2">
        <div className="w-12 h-12">
          <Image
            src={require(`@/assets/kit/${kitInfo.icon}`)}
            alt={t(`kit.${kitInfo.tag}.name`)}
          />
        </div>
        <span className="text-center text-sm">{t(`kit.${kitInfo.tag}.name`)}</span>
        <span className="text-gray-500 text-xs text-center line-clamp-2 md:line-clamp-none">
          {t(`kit.${kitInfo.tag}.desc`)}
        </span>
      </div>
    </Link>
  )
}

export default React.memo(KitItem)
