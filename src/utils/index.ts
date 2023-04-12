import { CartItemType } from '../types'

const getGrossTotalOf = (item: CartItemType) => {
  return item.price * item.quantity * (1 + item.taxRate / 100)
}

export { getGrossTotalOf }
