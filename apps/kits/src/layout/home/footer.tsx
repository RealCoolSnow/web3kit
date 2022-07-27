import { memo } from 'react'

export const Footer = memo(function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center border-t border-gray-50">
      <div className="hidden md:flex w-full border-t border-gray-50 text-[#9F9EA4] text-xs md:text-sm antialiased flex-wrap items-center justify-center py-4 px-5 [&>*]:mx-2.5 [&>*]:leading-[1.6]">
        <div>Copyright © 2022 Web3Kit.APP, All rights reserved.</div>
      </div>
    </footer>
  )
})
