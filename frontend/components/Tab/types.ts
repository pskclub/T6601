export interface ITabItem {
  label: string | VueComponent
  value: string
  component?: VueComponent
  icon?: string
}

export interface ITabOptions {
  tabs: ITabItem[]
  isRenderOnActive?: boolean
}
