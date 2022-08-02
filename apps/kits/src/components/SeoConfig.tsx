import { siteOrigin } from '@/constants'
import { useTranslation } from 'next-i18next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

interface Props {
  title: string
  description?: string
  keywords?: string
}

const SeoConfig = ({ title, description, keywords }: Props) => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const _title = `${title || t('home.title')} - Web3Kit`
  const _description = description || t('home.description')
  const _url = `${siteOrigin}${router.asPath}`
  const _cover = `${siteOrigin}/favicon.ico}`
  const _keywords = keywords || t('home.keywords')
  return (
    <NextSeo
      title={_title}
      description={_description}
      canonical={_url}
      additionalMetaTags={[
        {
          name: 'keywords',
          content: `${_keywords}`,
        },
      ]}
    />
  )
}

export default SeoConfig
