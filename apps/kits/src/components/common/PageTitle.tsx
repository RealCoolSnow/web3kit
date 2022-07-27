import Head from 'next/head'

type Props = {
  title: string
}

const PageTitle = ({ title }: Props) => {
  return (
    <Head>
      <title>{title} - web3kit</title>
    </Head>
  )
}

export default PageTitle
