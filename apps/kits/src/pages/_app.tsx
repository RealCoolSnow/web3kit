import '@/styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import { Layout } from '@/layout'
import nextI18nConfig from '../../next-i18next.config'
// export function reportWebVitals(metric: NextWebVitalsMetric) {
//   console.log(metric)
// }

export default appWithTranslation(Layout, nextI18nConfig)
