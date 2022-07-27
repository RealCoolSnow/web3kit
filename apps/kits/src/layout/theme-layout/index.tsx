import Head from 'next/head'
import { generateLayout, LayoutProps } from '..'

export function ThemeLayout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0 viewport-fit=cover" />
        <meta name="theme-color" content="#7053E5" />
      </Head>
      {children}
    </>
  )
}

export const withThemeLayout = generateLayout(ThemeLayout)
