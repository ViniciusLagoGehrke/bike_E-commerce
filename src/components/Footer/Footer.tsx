import ProgressBar from './ProgressBar'
import { useShoppingCart } from '../../cartStore/ShoppingCart'

function Footer() {
  const { state } = useShoppingCart()
  return (
    <footer className="flex h-14 items-center justify-center border-t bg-blue-50">
      <ProgressBar
        min={0}
        max={state.MAX_ITEMS}
        progress={state.cartItems.length}
      />
    </footer>
  )
}

export default Footer
