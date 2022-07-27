import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { withHomeLayout } from '@/layout/home'
import { NextSeo } from 'next-seo'

const Home: NextPage = () => {
  const router = useRouter()
  const { t } = useTranslation('home')
  const title = `${t('home')} - Web3Kit'`
  const description = `${t('description')}`
  const url = `${process.env.NEXT_PUBLIC_SITE_ORIGIN}${router.asPath}`
  const cover = `${process.env.NEXT_PUBLIC_SITE_ORIGIN}/favicon.ico}`
  return (
    <>
      <NextSeo title={title} description={description} canonical={url} />
      <section>
        <div className="flex flex-col items-center">hello</div>
      </section>
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
      ...(await serverSideTranslations(locale, ['home'])),
    },
  }
}

export default withHomeLayout(Home)
