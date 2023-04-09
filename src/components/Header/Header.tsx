import { ShoppingCart } from './ShoppingCart'
import { useShoppingCart } from '../../Store/ShoppingCart'

function Header() {
  const { state, dispatch } = useShoppingCart()

  const toggleCart = () => {
    state.isCartClosed
      ? dispatch({ type: 'OPEN_CART' })
      : dispatch({ type: 'CLOSE_CART' })
  }
  return (
    <header className="flex border-b bg-pink-50">
      <h1 className="flex-auto px-2 pb-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Your Shop!
      </h1>
      <aside
        className="flex items-center justify-around sm:w-40"
        onClick={toggleCart}
        data-testid="shopping-cart-toggle"
      >
        <div>{ShoppingCart}</div>
        <div>
          <h3 className="font-bold">Total: ${state.total}</h3>
        </div>
      </aside>
    </header>
  )
}

export default Header
