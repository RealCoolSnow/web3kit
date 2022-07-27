import { store } from '@/store'
import { AppProps } from 'next/app'
import { ComponentType } from 'react'
import { Provider } from 'react-redux'

export interface LayoutProps<LayoutOptions = {}> {
  children: React.ReactNode
  Component: ComponentType<any>
  pageProps: any
  options?: LayoutOptions
}

const LAYOUT_SYM = Symbol('next-layout')

export type LayoutSettings<LayoutOptions = {}> =
  | ComponentType<LayoutProps>
  | [
      ComponentType<LayoutProps<LayoutOptions>>,
      LayoutOptions | ((pageProps: any) => LayoutOptions)
    ]

export type LayoutComponent<
  C extends ComponentType<any>,
  LayoutOptions = {}
> = C & {
  [LAYOUT_SYM]?: LayoutSettings<LayoutOptions>[]
}

export function generateLayout(...layout: LayoutSettings<any>[]) {
  // reverse so that parent is in the head and child is in the child
  layout.reverse()
  return function <C extends ComponentType<any>>(page: C) {
    const layoutPage = page as LayoutComponent<C, any>
    let layouts = layoutPage[LAYOUT_SYM]
    if (layouts) {
      layouts.push(...layout)
    } else {
      layouts = layout
    }
    layoutPage[LAYOUT_SYM] = unique(layouts)
    return page
  }
}

function unique<T>(arr: T[]) {
  return arr.filter(
    (item, index, self) => index === self.findIndex((t) => t === item)
  )
}

export function Layout({ Component, pageProps }: AppProps) {
  const layoutPage = Component as LayoutComponent<typeof Component>
  const layouts = layoutPage[LAYOUT_SYM]
  const children = <Component {...pageProps} />
  if (layouts && layouts.length) {
    return layouts.reduce((children, settings) => {
      if (Array.isArray(settings)) {
        const ComponentLayout = settings[0]
        const options =
          typeof settings[1] === 'function'
            ? settings[1](pageProps)
            : settings[1]
        return (
          <ComponentLayout
            Component={Component}
            pageProps={pageProps}
            options={options}
          >
            {children}
          </ComponentLayout>
        )
      }
      const ComponentLayout = settings
      return (
        <Provider store={store}>
          <ComponentLayout Component={Component} pageProps={pageProps}>
            {children}
          </ComponentLayout>
        </Provider>
      )
    }, children)
  }
  return children
}
