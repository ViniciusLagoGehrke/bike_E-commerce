import { CartIcon } from '../../assets/CartIcon'
import { useShoppingCart } from '../../store/CartStore'

function Header() {
  const { state, dispatch } = useShoppingCart()

  const toggleCart = () => {
    state.isCartClosed
      ? dispatch({ type: 'OPEN_CART' })
      : dispatch({ type: 'CLOSE_CART' })
  }
  return (
    <header className="flex border-b bg-blue-50">
      <h1 className="flex-auto px-2 pb-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Your Shop!
      </h1>
      <aside
        className="flex items-center justify-between pr-2 sm:w-56"
        onClick={toggleCart}
        data-testid="shopping-cart-toggle"
      >
        <div>
          <h3 className="font-bold">Gross Total: ${state.total.toFixed(2)}</h3>
        </div>
        <div>{CartIcon}</div>
      </aside>
    </header>
  )
}

export default Header
