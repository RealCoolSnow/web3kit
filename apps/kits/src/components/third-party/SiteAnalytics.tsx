import Script from 'next/script'

const SiteAnalytics = () => {
  const gid = 'G-ZSBSFPKFQV'
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gid}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gid}');
        `}
      </Script>
    </>
  )
}

export default SiteAnalytics
