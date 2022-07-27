import Image from 'next/image'
import img404 from '@/assets/404.gif'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

export default function Page404() {
  const { t } = useTranslation('404')
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center p-5">
      <div className="max-w-[400px] w-full pointer-events-none">
        <Image src={img404} alt="404" />
      </div>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[50px] scale-x-[180%] mt-13 text-transparent">
        404
      </span>
      <span className="sr-only">404, page not found</span>
      <span className="text-[#818086] text-center [&>a]:px-1 [&>a]:underline [&>a]:text-primary-200 [&>a]:underline-offset-1 [&>a]:transition-colors [&>a:hover]:text-primary-200/80 ">
        {t('page_not_found')}
        <Link href="/" className="ml-2">
          {t('go_home')}
        </Link>
      </span>
    </div>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => {
  console.log(locale)

  return {
    props: {
      ...(await serverSideTranslations(locale, ['404'])),
    },
  }
}
