import Script from 'next/script'

const SiteMonitor = () => {
  const tid = 'O5d6PfQOzGopYY6QG8'
  return (
    <>
      <Script
        src="https://cdn-go.cn/aegis/aegis-sdk/latest/aegis.min.js"
        strategy="beforeInteractive"
      />
      <Script id="aegis" strategy="beforeInteractive">
        {`
           const aegis = new Aegis({
            id: '${tid}', // 上报 id
            uin: '', // 用户唯一 ID（可选）
            reportApiSpeed: true, // 接口测速
            reportAssetSpeed: true, // 静态资源测速
            spa: true, // spa 应用页面跳转的时候开启 pv 计算
            hostUrl: 'https://web3kit.app'
          });
        `}
      </Script>
    </>
  )
}

export default SiteMonitor
