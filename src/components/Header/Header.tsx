import { ShoppingCart } from './ShoppingCart'
type HeaderProps = {
  toggle: () => void
  totalAmount: number
}

function Header({ toggle, totalAmount }: HeaderProps) {
  return (
    <header className="flex">
      <h1 className="flex-auto px-2 pb-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Your Shop!
      </h1>
      <aside
        className="flex items-center justify-around sm:w-40"
        onClick={toggle}
        data-TestId="shopping-cart-toggle"
      >
        <div>{ShoppingCart}</div>
        <div>
          <h3 className="font-bold">Total: ${totalAmount}</h3>
        </div>
      </aside>
    </header>
  )
}

export default Header
