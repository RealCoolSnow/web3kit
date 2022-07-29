import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { withHomeLayout } from '@/layout/home'
import { NextSeo } from 'next-seo'
import { KitAPI } from '@/types/api-types'
import { baseUrl, siteOrigin } from '@/constants'
import KitList from '@/components/Kit/list'

type Props = {
  data: KitAPI.HomeData
}

const Home: NextPage<Props> = ({ data }: Props) => {
  const router = useRouter()
  const { t } = useTranslation('home')
  const title = `${t('home')} - Web3Kit`
  const description = t('description')
  const url = `${siteOrigin}${router.asPath}`
  const cover = `${siteOrigin}/favicon.ico}`
  const keywords = t('keywords')
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: `${keywords}`,
          },
        ]}
      />
      <section>
        <div className="flex flex-col items-center">
          <div className="mt-4">
            <KitList kitList={data.kits} />
          </div>
        </div>
      </section>
    </>
  )
}

type StaticProps = {
  locale: string
}

export const getStaticProps = async ({ locale }: StaticProps) => {
  const res = await fetch(`${baseUrl}/api/home`)
  const data = await res.json()
  return {
    props: {
      data: data,
      ...(await serverSideTranslations(locale, ['common', 'home'])),
    },
  }
}

export default withHomeLayout(Home)
