import dynamic from 'next/dynamic'
import { memo } from 'react'
import InfoIcon from '@mui/icons-material/Info'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  Divider,
  ListItemText,
} from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import logo from '@/assets/logo.png'
import Image from 'next/image'

const ConnectWallet = dynamic(() => import('@/components/ConnectWallet'), {
  ssr: false,
})

type Anchor = 'top' | 'left' | 'bottom' | 'right'

export const NavBar = memo(function NavBar() {
  const drawerAnchor = 'left'
  const logoSize = 32
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { t } = useTranslation(['common'])
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }
      setDrawerOpen(open)
    }
  const menuList = [
    {
      title: 'Home',
      link: '/',
    },
    {
      title: 'About',
      link: '/about',
    },
  ]
  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(drawerAnchor, false)}
      onKeyDown={toggleDrawer(drawerAnchor, false)}
    >
      <List>
        {menuList.map((item, index) => (
          <a href={item.link} key={item.title}>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  {index == 0 ? <HomeIcon /> : <span></span>}
                  {index == 1 ? <InfoIcon /> : <span></span>}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          </a>
        ))}
      </List>
      <Divider />
    </Box>
  )
  return (
    <div className="flex items-center w-full px-2 py-4 bg-white">
      <React.Fragment key={drawerAnchor}>
        <MenuIcon onClick={toggleDrawer(drawerAnchor, true)} />
        <Drawer
          anchor={drawerAnchor}
          open={drawerOpen}
          onClose={toggleDrawer(drawerAnchor, false)}
        >
          {drawerList()}
        </Drawer>
      </React.Fragment>
      <div className="flex-1 flex items-center justify-center">
        <Image
          src={logo}
          alt={t('app_name')}
          className="rounded-full"
          width={logoSize}
          height={logoSize}
        />
        <span className="ml-2 hidden md:block">{t('app_name')}</span>
      </div>
      <div className="ml-auto">
        <ConnectWallet />
      </div>
    </div>
  )
})
