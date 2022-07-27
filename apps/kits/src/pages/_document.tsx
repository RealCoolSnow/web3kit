import { isProd } from '@/constants'
import { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />{' '}
        <Script
          src="https://cdn-go.cn/aegis/aegis-sdk/latest/aegis.min.js"
          strategy="beforeInteractive"
        />
        {isProd && (
          <Script id="aegis" strategy="afterInteractive">
            {`
           const aegis = new Aegis({
            id: 'O5d6PfQOzGopYY6QG8', // 上报 id
            uin: '', // 用户唯一 ID（可选）
            reportApiSpeed: true, // 接口测速
            reportAssetSpeed: true, // 静态资源测速
            spa: true, // spa 应用页面跳转的时候开启 pv 计算
            hostUrl: 'https://web3kit.app'
          });
        `}
          </Script>
        )}
      </body>
    </Html>
  )
}
