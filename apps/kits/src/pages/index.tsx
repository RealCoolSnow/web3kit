import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import PageTitle from '@/components/common/PageTitle'
import Counter from '@/components/Counter'
import { helloGet2 } from '@/api/common'

const Home: NextPage = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  
  return (
    <>
      <PageTitle title={t('home')} />
      <div className="flex flex-col items-center">
    
      </div>
    </>
  )
}

type StaticProps = {
  locale: string
}
export const getStaticProps = async ({ locale }: StaticProps) => {
  console.log(locale)

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default Home
