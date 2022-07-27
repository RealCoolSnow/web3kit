import { Dispatch } from '@/store'
import { useRouter } from 'next/router'
import { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'

const LocaleSwitch = () => {
  const router = useRouter()
  const dispatch = useDispatch<Dispatch>()
  const onLocaleChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value
    dispatch.common.setLanguage(locale)
    router.replace(router.pathname, router.pathname, { locale })
  }
  return (
    <div>
      <select
        className="form-select appearance-none
          block
          w-full
          px-3
          py-1.5
          text-sm
          text-gray-700
          bg-white bg-clip-padding bg-no-repeat
          border border-solid border-white
          font-sans
          rounded
          transition
          ease-in-out
          m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        onChange={onLocaleChanged}
        defaultValue={router.locale}
      >
        <option value="en">English&nbsp;</option>
        <option value="cn">中文简体&nbsp;&nbsp;&nbsp;&nbsp;</option>
      </select>
    </div>
  )
}

export default LocaleSwitch
