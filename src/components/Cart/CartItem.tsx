import { CartItemType } from '../../types'

type CartItemProps = Omit<CartItemType, 'maxAmount'>

function CartItem({
  index,
  productName,
  taxRate,
  price,
  quantity
}: CartItemProps) {
  // Todo
  console.log(taxRate)
  return (
    <tr className="border-b last:border-none">
      <td className="text-center font-normal">{index! + 1}</td>
      <td className="text-center font-normal">{productName}</td>
      <td className="text-center font-normal">${price}</td>
      <td className="text-center font-normal">{quantity}</td>
      <td className="text-center font-normal">${price * quantity}</td>
    </tr>
  )
}

export default CartItem
