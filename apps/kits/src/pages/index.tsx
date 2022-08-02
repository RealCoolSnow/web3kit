import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { withHomeLayout } from '@/layout/home'
import { KitAPI } from '@/types/api-types'
import KitList from '@/components/ui/Kit/list'
import { KIT_LIST_ALL } from '@/data/kit-list'
import SeoConfig from '@/components/SeoConfig'

type Props = {
  data: KitAPI.HomeData
}

const Home: NextPage<Props> = ({ data }: Props) => {
  const { t } = useTranslation('common')
  return (
    <>
      <SeoConfig
        title={t('home.title')}
        description={t('home.description')}
        keywords={t('home.keywords')}
      />
      <section>
        <div className="flex flex-col items-center">
          <div className="p-4">
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
  //const res = await fetch(`${baseUrl}/api/home`)
  const data = { kits: KIT_LIST_ALL } //await res.json()
  return {
    props: {
      data: data,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default withHomeLayout(Home)
