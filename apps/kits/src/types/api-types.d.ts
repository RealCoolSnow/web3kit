export namespace KitAPI {
  export interface KitInfo {
    tag: string // 对应locales/common.json->kit下字段
    icon: string
  }
  export interface HomeData {
    kits: KitInfo[]
  }
}
