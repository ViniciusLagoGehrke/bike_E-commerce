import { TrashIcon } from '../../assets/TrashIcon'
import { useShoppingCart } from '../../cartStore/ShoppingCart'
import { CartItemType } from '../../types'

type CartItemProps = Omit<CartItemType, 'maxAmount'>

function CartItem({ index, productName, price, quantity }: CartItemProps) {
  const { dispatch } = useShoppingCart()

  const handleItemRemove = () => {
    dispatch({ type: 'REMOVE_ITEM', payload: { index: index as number } })
  }

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
      <td className="font-normal">${(price * quantity).toFixed(2)}</td>
    </tr>
  )
}

export default CartItem
