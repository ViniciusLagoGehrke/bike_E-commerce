import { CartItemType } from '../../types'
import CartItem from './CartItem'
import Button from '../Button'
import { useShoppingCart } from '../../store/ShoppingCart'

type itemsProp = Omit<CartItemType, 'index'>[]

function Cart() {
  const { state, dispatch } = useShoppingCart()

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const handlePurchase = () => {
    dispatch({ type: 'PURCHASE' })
  }

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
        state.isCartClosed ? 'hidden' : 'absolute'
      } right-0 flex h-full w-full flex-col justify-between border-l bg-slate-50 px-2 sm:w-5/12 sm:min-w-fit`}
    >
      <div className="overflow-y-scroll">
        <table className="mx-auto mt-2 table w-full table-auto px-2 text-sm sm:text-base">
          <thead className="h-8 border-b-2 border-b-black">
            <tr>
              <th className="w-5"></th>
              <th className="text-left font-medium">Product</th>
              <th className="text-left font-medium">Unit Price</th>
              <th className="text-left font-medium">Amount</th>
              <th className="text-left font-medium">Price</th>
            </tr>
          </thead>
          <tbody>{state.cartItems ? renderItems(state.cartItems) : null}</tbody>
        </table>
      </div>
      <footer className="flex w-full justify-around py-2">
        <Button
          title="Clear Cart"
          buttonStyle="secondary"
          onClick={handleClearCart}
        />
        <Button title="Buy!" onClick={handlePurchase} />
      </footer>
    </aside>
  )
}

export default Cart
