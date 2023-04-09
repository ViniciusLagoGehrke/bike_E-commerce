import { CartItemType } from '../../types'

function CartItem({
  index,
  productName,
  taxRate,
  price,
  quantity
}: CartItemType) {
  console.log(taxRate)
  return (
    <tr>
      <td className="text-center font-normal">{index + 1}</td>
      <td className="text-center font-normal">{productName}</td>
      <td className="text-center font-normal">${price}</td>
      <td className="text-center font-normal">{quantity}</td>
      <td className="text-center font-normal">${price * quantity}</td>
    </tr>
  )
}

export default CartItem
