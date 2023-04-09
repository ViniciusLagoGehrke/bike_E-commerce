import { CartItemType } from '../../types'
import CartItem from './CartItem'
import Button from '../Button'

type itemsProp = Omit<CartItemType, 'index'>[]

type CartProps = {
  isCartClosed: boolean
  items: itemsProp
}

function Cart({ isCartClosed, items }: CartProps) {
  function renderItems(items: itemsProp) {
    return (
      items.length > 0 &&
      items.map(({ id, productName, price, taxRate, quantity }, index) => (
        <CartItem
          index={index}
          key={id}
          id={id}
          productName={productName}
          price={price}
          taxRate={taxRate}
          quantity={quantity}
        />
      ))
    )
  }

  return (
    <aside
      className={`${
        isCartClosed ? 'hidden' : 'absolute'
      } right-0 flex h-full w-full flex-col justify-between sm:w-80`}
    >
      {items ? (
        <table className="mx-auto mt-2 table w-full table-auto px-2 sm:text-base">
          <tr className="h-8">
            <th className="font-medium">Nº</th>
            <th className="font-medium">Product</th>
            <th className="font-medium">Unit Price</th>
            <th className="font-medium">Amount</th>
            <th className="font-medium">Price</th>
          </tr>
          {renderItems(items)}
        </table>
      ) : null}

      <div className="flex w-full justify-around py-2">
        <Button title="Clear Cart" buttonStyle="secondary" />
        <Button title="Buy!" />
      </div>
    </aside>
  )
}

export default Cart
