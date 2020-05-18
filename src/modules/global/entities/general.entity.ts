export interface SelectOption {
  key: string | number | Date | boolean;
  value: string | number | Date | boolean;
}
export interface MenuItems {
  label: string,
  icon: string,
  route?: string
  action?: string
}
