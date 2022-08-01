import { siteOrigin } from '@/constants'
import {
  BlockChainExplorerItem,
  BLOCK_CHAIN_EXPLORER_LIST,
} from '@/data/kits/block-chain-explorer'
import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  data: {
    list: BlockChainExplorerItem[]
  }
}

const ExplorerItem = () => {
  return <div></div>
}
const BlockChainExplorerPage: NextPage<Props> = ({ data }: Props) => {
  const router = useRouter()
  const { t } = useTranslation(['common'])
  const title = `${t('kit.block_chain_explorer.name')} - Web3Kit`
  const description = t('home.description')
  const url = `${siteOrigin}${router.asPath}`
  const cover = `${siteOrigin}/favicon.ico}`
  const keywords = t('home.keywords')
  const explorerList = (data.list || []).map((item: BlockChainExplorerItem) => {
    return (
      <a
        key={item.tag}
        href={item.url}
        target="_blank"
        className="flex flex-col items-center border border-gray-200 rounded-md py-2 shadow active:opacity-70 cursor-pointer"
        rel="noreferrer"
      >
        <Image
          src={require(`@/assets/chain/${item.tag}.png`)}
          alt={t(`chain.${item.tag}`)}
          width={32}
          height={32}
        />
        <span className="mt-2">{t(`chain.${item.tag}`)}</span>
      </a>
    )
  })
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
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 overflow-x-auto snap-x p-4">
          {explorerList}
        </div>
      </section>
    </>
  )
}

type StaticProps = {
  locale: string
}

export const getStaticProps = async ({ locale }: StaticProps) => {
  const data = { list: BLOCK_CHAIN_EXPLORER_LIST }
  return {
    props: {
      data: data,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default React.memo(BlockChainExplorerPage)
