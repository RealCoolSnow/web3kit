import { siteOrigin } from '@/constants'
import { withHomeLayout } from '@/layout/home'
import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

const About: NextPage = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const title = `${t('feedback')} - Web3Kit`
  const description = t('home.description')
  const url = `${siteOrigin}${router.asPath}`
  const cover = `${siteOrigin}/favicon.ico}`
  const keywords = t('home.keywords')
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
          <div className="p-4 flex flex-col items-center">
            <div className="font-semibold">{t('email')}</div>
            <a href="mailto:coolsnow2020@gmail.com">coolsnow2020@gmail.com</a>
            <div className="font-semibold mt-4">Twitter</div>
            <a href="https://twitter.com/CoolSnow0927" target="_blank" rel="noreferrer">twitter.com/CoolSnow0927</a>
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
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default withHomeLayout(About)
