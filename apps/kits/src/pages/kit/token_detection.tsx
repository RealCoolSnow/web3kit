import SeoConfig from '@/components/SeoConfig'
import { baseUrl } from '@/constants'
import {
  TokenDetectionItem,
  TOKEN_DETECTION_LIST,
} from '@/data/kits/token_detection'
import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ChangeEvent, useCallback, useState } from 'react'
import Image from 'next/image'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { CircularProgress, Popover } from '@mui/material'

type ContractPickerProps = {
  onCheck: (chainId: number, address: string) => void
}
const ContractPicker = ({ onCheck }: ContractPickerProps) => {
  const { t } = useTranslation(['common', 'token_detection'])
  const [chainIndex, setChainIndex] = useState(0)
  const [address, setAddress] = useState('') //0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
  const [anchorPop, setAnchorPop] = useState<HTMLDivElement | null>(null)
  const popOpened = Boolean(anchorPop)
  const popId = popOpened ? 'chain-popover' : undefined

  const onAddressChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }
  const showChainPicker = (e: React.MouseEvent<HTMLDivElement>) => {
    setAnchorPop(e.currentTarget)
  }
  const closeChainPicker = () => {
    setAnchorPop(null)
  }
  const onChainPicked = (i: number) => {
    setChainIndex(i)
    closeChainPicker()
  }
  const onCheckClick = () => {
    if (address.trim().length > 0) {
      onCheck(TOKEN_DETECTION_LIST[chainIndex].chainId, address)
    }
  }

  return (
    <div className="rounded flex flex-col items-center">
      <div className="flex items-center bg-white p-1 rounded">
        <div
          aria-describedby={popId}
          onClick={showChainPicker}
          className="flex items-center"
        >
          <Image
            src={require(`@/assets/chain/${TOKEN_DETECTION_LIST[chainIndex].tag}.png`)}
            alt={t(`chain.${TOKEN_DETECTION_LIST[chainIndex].tag}`)}
            width={24}
            height={24}
          />
          <span className="ml-1 btn cursor-pointer text-sm">
            {t(`chain.${TOKEN_DETECTION_LIST[chainIndex].tag}`)}
          </span>
        </div>
        <ArrowDropDownIcon />
        <div className="w-px h-4 bg-gray-200 mx-2"></div>
        <input
          value={address}
          type="text"
          onChange={onAddressChanged}
          maxLength={64}
          className="
          block
          px-3
          py-1.5
          text-sm
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border-none
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder={t('input_contact_address_tip', {
            ns: 'token_detection',
          })}
          required
        />
      </div>
      <Popover
        id={popId}
        open={popOpened}
        anchorEl={anchorPop}
        onClose={closeChainPicker}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <ul className="pt-2">
          {TOKEN_DETECTION_LIST.map(
            (item: TokenDetectionItem, index: number) => (
              <li
                key={item.tag}
                className={`py-2 flex items-center p-2 border-t border-gray-100 ${
                  index == chainIndex
                    ? 'bg-primary text-white'
                    : 'text-gray-700'
                }`}
                onClick={(e) => onChainPicked(index)}
              >
                <Image
                  src={require(`@/assets/chain/${item.tag}.png`)}
                  alt={t(`chain.${item.tag}`)}
                  width={24}
                  height={24}
                />
                <span className="ml-1 btn cursor-pointer text-sm">
                  {t(`chain.${item.tag}`)}
                </span>
              </li>
            )
          )}
        </ul>
      </Popover>
      <button
        className={`text-sm font-semibold text-white px-4 py-1.5 btn rounded flex shadow shadow-gray-500/60 mt-8 ${
          address.trim().length > 0 ? 'bg-primary' : 'bg-gray-500'
        }`}
        onClick={onCheckClick}
      >
        {t('check', { ns: 'token_detection' })}
      </button>
    </div>
  )
}

const TokenDetection: NextPage = () => {
  const { t } = useTranslation(['common', 'token_detection'])
  const [loading, setLoading] = useState(false)
  const checkToken = async (chainId: number, address: string) => {
    setLoading(true)
    const res = await fetch(
      `${baseUrl}/api/kit/token_detection?chain_id=${chainId}&contract_addresses=${address}`
    )
    const data = await res.json()
    setLoading(false)
  }
  return (
    <>
      <SeoConfig
        title={t('kit.token_detection.name')}
        description={t('home.description')}
        keywords={t('home.keywords')}
      />
      <div className="flex flex-col items-center p-2">
        {!loading && (
          <div className="bg-gray-100 rounded-md p-4">
            <ContractPicker onCheck={checkToken} />
          </div>
        )}
        {loading && (
          <div className="flex flex-col items-center mt-8">
            <CircularProgress color="secondary" />
            <span className="mt-2">{t('loading')}</span>
          </div>
        )}
      </div>
    </>
  )
}

type StaticProps = {
  locale: string
}

export const getStaticProps = async ({ locale }: StaticProps) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'token_detection'])),
    },
  }
}

export default TokenDetection
