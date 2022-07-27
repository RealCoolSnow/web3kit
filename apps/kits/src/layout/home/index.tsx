import { generateLayout, LayoutProps } from '..'
import { Header } from './header'
import { Footer } from './footer'
import { ThemeLayout } from '../theme-layout'

export const HomeLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex items-start flex-row-reverse">
      <section className="w-screen sm:w-0 flex-auto min-h-screen flex flex-col items-stretch">
        <Header />
        <main className="flex-auto">{children}</main>
        <Footer />
      </section>
    </div>
  )
}

export const withHomeLayout = generateLayout(ThemeLayout, HomeLayout)
