import { memo } from 'react'
import Logo from '@/assets/logo.svg'
import { Anchor } from '@/components/anchor'

export const Header = memo(function Header() {
  return (
    <header className="sticky z-1 top-0 bg-white h-12.5 md:h-18 flex items-center justify-end">
      <Anchor
        className="sm:hidden absolute inset-0 flex items-center justify-center pointer-events-none"
        href="/"
      >
        {/* <Logo className="h-6 text-primary-200 pointer-events-auto" /> */}
      </Anchor>
    </header>
  )
})
