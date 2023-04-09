import { TrashIcon } from '../../assets/TrashIcon'
import { useShoppingCart } from '../../Store/ShoppingCart'
import { CartItemType } from '../../types'

type CartItemProps = Omit<CartItemType, 'maxAmount'>

function CartItem({
  index,
  productName,
  taxRate,
  price,
  quantity
}: CartItemProps) {
  const { dispatch } = useShoppingCart()

  const handleItemRemove = () => {
    dispatch({ type: 'REMOVE_ITEM', payload: { index: index as number } })
  }
  // Todo
  console.log(taxRate)
  return (
    <tr className="border-b last:border-none">
      <td
        className="cursor-pointer text-center font-normal"
        onClick={handleItemRemove}
      >
        {TrashIcon}
      </td>
      <td className="font-normal">{productName}</td>
      <td className="font-normal">${price}</td>
      <td className="font-normal">{quantity}</td>
      <td className="font-normal">${price * quantity}</td>
    </tr>
  )
}

export default CartItem
