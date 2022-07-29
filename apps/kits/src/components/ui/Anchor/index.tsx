import React, { RefAttributes, useImperativeHandle } from 'react'
import Link, { LinkProps } from 'next/link'
import { useRef } from 'react'
import { useEvent } from 'easy-hooks'

export type InterAnchorProps = Omit<
  LinkProps & React.ComponentProps<'a'>,
  'passHref' | 'href' | 'target' | 'key' | 'ref' | 'onClick'
> &
  (
    | {
        target: string
        href?: string
        onClick?: React.MouseEventHandler<HTMLAnchorElement>
      }
    | {
        target?: undefined
        href?: LinkProps['href']
        onClick?: React.MouseEventHandler<HTMLAnchorElement>
      }
  )

export type AnchorProps = InterAnchorProps & RefAttributes<HTMLAnchorElement>

export const Anchor = React.forwardRef(function Anchor(
  {
    href,
    as,
    replace,
    scroll,
    shallow,
    prefetch,
    locale,
    ...props
  }: InterAnchorProps,
  forwardRef: React.Ref<HTMLAnchorElement>
) {
  const ref = useRef<HTMLAnchorElement>(null!)
  useImperativeHandle(forwardRef, () => ref.current)

  function handleClick(e: MouseEvent) {
    if (ref.current.getAttribute('href') === '#') {
      // prevent to change to the '#'
      e.preventDefault()
      return false
    }
  }

  useEvent(ref, 'click', handleClick)

  if (
    !href ||
    (typeof href === 'string' && !/^(\/|https?:\/\/)/.test(href)) ||
    (props.target && props.target !== '_self')
  ) {
    href = href ?? '#'
    return <a ref={ref} {...props} href={href as string} />
  }
  return (
    <Link
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
      locale={locale}
    >
      <a ref={ref} {...props} />
    </Link>
  )
})
