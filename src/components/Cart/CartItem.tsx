import { TrashIcon } from '../../assets/TrashIcon'
import { useShoppingCart } from '../../store/CartStore'
import { getGrossTotalOf } from '../../store/Reducer'
import { CartItemType } from '../../types'

type CartItemProps = Omit<CartItemType, 'maxAmount'>

function CartItem({
  index,
  productName,
  price,
  quantity,
  taxRate
}: CartItemProps) {
  const { dispatch } = useShoppingCart()

  const handleItemRemove = () => {
    dispatch({ type: 'REMOVE_ITEM', payload: { index: index as number } })
  }

  const currentItem = {
    id: '',
    maxAmount: quantity,
    index,
    productName,
    price,
    quantity,
    taxRate
  }
  const grossValue = getGrossTotalOf(currentItem)

  return (
    <tr data-testid="cart-item" className="h-8 border-b last:border-none">
      <td
        data-testid="delete-item-button"
        className="cursor-pointer text-center font-normal"
        onClick={handleItemRemove}
      >
        {TrashIcon}
      </td>
      <td className="font-normal">{productName}</td>
      <td className="font-normal">${price}</td>
      <td className="font-normal">{quantity}</td>
      <td className="font-normal">${grossValue.toFixed(2)}</td>
    </tr>
  )
}

export default CartItem
