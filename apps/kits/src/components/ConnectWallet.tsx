import {
  ConnectState,
  IWeb3Event,
  useEasyWeb3,
  Web3Callback,
  Web3EventType,
} from '@/web3/core'
import Image from 'next/image'
import { CircularProgress, Menu, MenuItem } from '@mui/material'
import { useTranslation } from 'next-i18next'
import imgAvatar from '@/assets/svg/avatar.svg'
import { useState } from 'react'

const ConnectWallet = () => {
  const { t, ready } = useTranslation(['common'])
  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null)
  const menuOpened = Boolean(anchorMenu)
  const web3callback: Web3Callback = (e: IWeb3Event) => {
    switch (e.type) {
      case Web3EventType.Provider_Disconnect:
        // alert(typeof e.data == 'string' ? e.data : JSON.stringify(e.data))
        break
    }
  }
  const { easyWeb3, connectState, walletInfo } = useEasyWeb3(web3callback)
  const onConnect = () => {
    easyWeb3.connectWallet()
  }
  const onAvatarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorMenu(event.currentTarget)
  }
  const onMenuClose = () => {
    setAnchorMenu(null)
  }
  const onLogout = () => {
    easyWeb3.disconnect()
    onMenuClose()
  }
  return (
    <>
      {connectState == ConnectState.Disconnected && (
        <button
          className="text-sm font-semibold bg-primary text-white px-4 py-1.5 btn rounded-full flex shadow shadow-gray-500/60"
          onClick={onConnect}
        >
          <span className="block sm:hidden">{ready ? t('connect') : ''}</span>
          <span className="hidden sm:block">
            {ready ? t('connect_wallet') : ''}
          </span>
        </button>
      )}
      {connectState == ConnectState.Connecting && (
        <CircularProgress color="secondary" size="1.2rem" />
      )}
      {connectState == ConnectState.Connected && (
        <div className="flex items-center">
          <div className="btn cursor-pointer border border-gray-200 rounded-full px-2 py-1 shadow">
            <Image
              src={imgAvatar}
              alt={walletInfo.address}
              className="rounded-full"
            />
            <span
              className="text-primary ml-2"
              id="avatar-view"
              aria-controls={menuOpened ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={menuOpened ? 'true' : undefined}
              onClick={onAvatarClick}
            >
              {easyWeb3.getAddressShort(walletInfo.address)}
            </span>
            {/* <span className="text-sm">
              {easyWeb3.getBalanceShort(walletInfo.balance)}&nbsp;ETH
            </span> */}
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorMenu}
            open={menuOpened}
            onClose={onMenuClose}
            MenuListProps={{
              'aria-labelledby': 'avatar-view',
            }}
          >
            <MenuItem onClick={onLogout}>{t('logout')}</MenuItem>
          </Menu>
        </div>
      )}
    </>
  )
}

export default ConnectWallet
