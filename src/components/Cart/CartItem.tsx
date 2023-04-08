import { CartItemType } from '../../types'

function CartItem({ productName, taxRate, price, quantity }: CartItemType) {
  console.log(taxRate)
  return (
    <tr>
      <td className="text-center font-normal">{productName}</td>
      <td className="text-center font-normal">${price}</td>
      <td className="text-center font-normal">{quantity}</td>
      <td className="text-center font-normal">${price * quantity}</td>
    </tr>
  )
}

export default CartItem
