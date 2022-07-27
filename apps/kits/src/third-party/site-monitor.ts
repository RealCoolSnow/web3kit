import Aegis from 'aegis-web-sdk'

const TID = 'O5d6PfQOzGopYY6QG8'

let aegis: Aegis | undefined

const setupSiteMonitor = () => {
  if (window !== undefined && aegis === undefined) {
    aegis = new Aegis({
      id: `${TID}`, // 上报 id
      uin: '', // 用户唯一 ID（可选）
      reportApiSpeed: true, // 接口测速
      reportAssetSpeed: true, // 静态资源测速
      spa: true, // spa 应用页面跳转的时候开启 pv 计算
      hostUrl: 'https://web3kit.app',
    })
  }
}

const getAegis = (): Aegis => aegis!

export { setupSiteMonitor, getAegis }
