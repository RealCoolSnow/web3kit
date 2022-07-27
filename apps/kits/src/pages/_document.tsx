import { isProd } from '@/constants'
import Document, {
  DocumentContext,
  DocumentInitialProps,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import Script from 'next/script'
import { ServerStyleSheet } from 'styled-components'

const eCSTPolyfill = `Error.captureStackTrace=Error.captureStackTrace||function(obj){obj.stack=[{toString:null}];if(Error.prepareStackTrace){var frame={isEval:function(){return false;},getFileName:function(){return "filename";},getLineNumber:function(){return 1;},getColumnNumber:function(){return 1;},getFunctionName:function(){return "functionName"}};obj.stack=Error.prepareStackTrace(obj,[frame,frame,frame]);}else{obj.stack=obj.stack||obj.name||"Error";}};`

export default class MyDocument extends Document<DocumentProps> {
  public static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    // support styled-components
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })
      const initialProps = await super.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    const polyfill = process.env.polyfill_url
    return (
      <Html>
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="renderer" content="webkit" />
        </Head>
        <body>
          <Main />
          {polyfill ? <script src={polyfill} async /> : null}
          <script dangerouslySetInnerHTML={{ __html: eCSTPolyfill }} />
          <NextScript />
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
}
