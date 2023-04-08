import { CartItemType } from '../../types'
import CartItem from './CartItem'

type CartProps = {
  isCartClosed: boolean
  items: CartItemType[]
}

function Cart({ isCartClosed, items }: CartProps) {
  return (
    <aside
      className={`${
        isCartClosed ? 'hidden' : 'absolute'
      } h-full w-full bg-pink-300 sm:relative sm:w-80`}
    >
      {items ? (
        <table className="mx-auto mt-2 table w-full table-auto px-2 sm:text-base">
          <tr className="h-8">
            <th className="font-medium">Product</th>
            <th className="font-medium">Unit Price</th>
            <th className="font-medium">Amount</th>
            <th className="font-medium">Price</th>
          </tr>
          {items.length > 0 &&
            items.map(({ id, productName, price, taxRate, quantity }) => (
              <CartItem
                key={id}
                id={id}
                productName={productName}
                price={price}
                taxRate={taxRate}
                quantity={quantity}
              />
            ))}
        </table>
      ) : null}
    </aside>
  )
}

export default Cart
