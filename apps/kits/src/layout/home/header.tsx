import { memo } from 'react'
import { NavBar } from './nav-bar'

export const Header = memo(function Header() {
  return (
    <header className="sticky z-1 top-0 bg-white h-10 md:h-12 flex items-center justify-end">
      <NavBar />
    </header>
  )
})
