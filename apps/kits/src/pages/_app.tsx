import '@/styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import { Layout } from '@/layout'

// export function reportWebVitals(metric: NextWebVitalsMetric) {
//   console.log(metric)
// }

export default appWithTranslation(Layout)
