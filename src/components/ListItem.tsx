import { ListItemProps } from '../models/component-types'
import MenuItem from 'antd/es/menu/MenuItem'

export function ListItem({ data: { name = '' } }: ListItemProps) {
  return <MenuItem>{name}</MenuItem>
}
