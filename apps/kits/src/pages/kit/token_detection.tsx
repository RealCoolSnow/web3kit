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
import { Alert, CircularProgress, Popover, Snackbar } from '@mui/material'
import { TOKEN_DETECTION_TEST_DATA } from '@/data/kits/token_detection.test'
import { ellipseAddress, numberToThousands } from '@/web3/core/helper/utilities'

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
    const address = e.target.value
    setAddress(address.trim())
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
            width={18}
            height={18}
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
          w-42
          md:w-56
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
      <span className="mt-4 text-xs text-gray_text">{t('sources_from', { ns: 'token_detection' })}</span>
    </div>
  )
}

type IContractDataItem = { [key: string]: string | any }

type ContractInfoPanelProps = {
  title: string
  ns: string
  subtitle?: string
  data: IContractDataItem
  className?: string
}

const ContractInfoPanel = (props: ContractInfoPanelProps) => {
  const { t } = useTranslation('token_detection')
  const list = Object.keys(props.data).map((key) => {
    return (
      <div key={key} className="my-2 text-sm w-full flex">
        <span className="text-gray_text">
          {props.ns === 'base' ? t(`${props.ns}.${key}`) : t(`${key}`)}
        </span>
        <span className="ml-auto">{props.data[key]}</span>
      </div>
    )
  })
  return (
    <div
      className={`border border-gray-100 rounded p-2 ${props.className || ''}`}
    >
      <div className="font-semibold">{props.title}</div>
      {props.subtitle && <div className="mt-2">{props.subtitle}</div>}
      {list}
    </div>
  )
}

type ContractInfoProps = {
  data: IContractDataItem
}

const getHolders = (data: IContractDataItem, k: 'holders' | 'lp_holders') => {
  const holders: { [key: string]: string } = {}
  if (data[k] && data[k].length > 0) {
    for (let i = 0; i < data.holders.length; i++) {
      const holder: { [key: string]: string } = data[k][i]
      holders[ellipseAddress(holder['address'], 6)] =
        numberToThousands(parseFloat(holder['balance']).toFixed(0)) +
        ' (' +
        (parseFloat(holder['percent']) * 100).toFixed(2) +
        '%' +
        ')'
    }
  }
  return holders
}
const ContractInfo = ({ data }: ContractInfoProps) => {
  const { t } = useTranslation('token_detection')
  const baseInfo = {
    name: data.token_name,
    symbol: data.token_symbol,
    creator: ellipseAddress(data.creator_address as string, 6),
    total: numberToThousands(
      parseFloat(data.total_supply as string).toFixed(0)
    ),
  }
  const holderInfo = getHolders(data, 'holders')
  const lpHolderInfo = getHolders(data, 'lp_holders')
  return (
    <div className="flex flex-col text-sm w-80 md:w-96">
      <span className="font-semibold my-4">{t('check_report')}</span>
      <ContractInfoPanel title={t('base.info')} data={baseInfo} ns="base" />
      <div className="border border-gray-100 rounded p-2 mt-2">
        <div className="font-semibold">{t('security.info')}</div>
        <div className="mt-2 flex items-center">
          <Image
            src={require(`@/assets/kit/${
              data.is_open_source === '1' ? 'ic_safe' : 'ic_warning'
            }.png`)}
            width={20}
            height={20}
            alt=""
          />
          <span className="ml-2">
            {t(
              data.is_open_source === '1'
                ? 'security.source_verified'
                : 'security.source_not_verified'
            )}
          </span>
        </div>
        <div className="mt-2 flex items-center">
          <Image
            src={require(`@/assets/kit/${
              data.is_proxy === '0' ? 'ic_safe' : 'ic_warning'
            }.png`)}
            width={20}
            height={20}
            alt=""
          />
          <span className="ml-2">
            {t(
              data.is_proxy === '0'
                ? 'security.no_proxy'
                : 'security.have_proxy'
            )}
          </span>
        </div>
      </div>
      <ContractInfoPanel
        title={t('holder.info')}
        data={holderInfo}
        subtitle={`${t('holder.title')}: ${numberToThousands(
          data.holder_count as string
        )}`}
        ns="holder"
        className="mt-2"
      />
      <ContractInfoPanel
        title={t('lp_holder.info')}
        data={lpHolderInfo}
        subtitle={`${t('lp_holder.title')}: ${numberToThousands(
          data.lp_holder_count as string
        )}`}
        ns="lp_holder"
        className="mt-2"
      />
    </div>
  )
}

const TokenDetection: NextPage = () => {
  const { t } = useTranslation(['common', 'token_detection'])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [contractInfo, setContractInfo] = useState<{}>(
    // TOKEN_DETECTION_TEST_DATA.data
    {}
  )
  const checkToken = async (chainId: number, address: string) => {
    setLoading(true)
    setContractInfo({})
    const res = await fetch(
      `${baseUrl}/api/kit/token_detection?chain_id=${chainId}&contract_addresses=${address}`
    )
    const data = await res.json()
    if (data.code === 0) {
      setContractInfo(data.data)
    } else {
      setMessage(data.msg)
    }
    setLoading(false)
  }
  const onMessageClose = () => setMessage('')
  return (
    <>
      <SeoConfig
        title={t('kit.token_detection.name')}
        description={t('home.description')}
        keywords={t('home.keywords')}
      />
      <div className="flex flex-col items-center p-2">
        <div
          className={`bg-gray-100 rounded-md p-4 ${
            loading ? 'invisible' : 'visible'
          }`}
        >
          <ContractPicker onCheck={checkToken} />
        </div>
        {loading && (
          <div className="flex flex-col items-center mt-8">
            <CircularProgress color="secondary" />
            <span className="mt-2">{t('loading')}</span>
          </div>
        )}
        {'token_name' in contractInfo && <ContractInfo data={contractInfo} />}
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={message.length > 0}
        autoHideDuration={1500}
        onClose={onMessageClose}
      >
        <Alert severity="warning">{message}</Alert>
      </Snackbar>
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
