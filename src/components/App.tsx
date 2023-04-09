import { useState } from 'react'
import ProductList from './ProductList'
import QuantitySelector from './QuantitySelector'
import Button from './Button'
import Cart from './Cart'
import { ProductType } from '../types'
import products from '../../data/products.json'

function App() {
  const [selected, setSelected] = useState<ProductType | null>(null)
  const [quantity, setQuantity] = useState<number>(1)
  const [isCartClosed, setCartClosed] = useState<boolean>(true)

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProductId = event.target.value
    const selectedProduct = products.find(
      (product) => product.id === selectedProductId
    )
    setSelected(selectedProduct || null)
  }

  const handleAmountChange = (selectedQuantity: number) => {
    setQuantity(selectedQuantity)
  }

  const toggleCart = () => {
    setCartClosed((prev) => !prev)
  }

  // Mock to be removed
  const cartItems = [
    {
      ...products[0],
      quantity
    },
    {
      ...products[1],
      quantity
    }
  ]

  const calculateTotal = () => {
    return cartItems.reduce((acc, cur) => acc + cur.quantity * cur.price, 0)
  }

  const handleAddToCart = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('added to cart')
  }

  return (
    <div className="bg-white">
      <div className="mx-auto flex h-screen max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-auto">
          <div className="flex flex-auto flex-col">
            <header className="flex">
              <h1 className="flex-auto bg-blue-300 px-2 pb-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Your Shop!
              </h1>
              <aside
                className="flex items-center justify-around bg-blue-600 sm:w-80"
                onClick={toggleCart}
              >
                <div>Cart</div>
                <div>
                  <h3 className="font-bold">Total: ${calculateTotal()}</h3>
                </div>
              </aside>
            </header>
            <div className="relative flex flex-auto">
              <main className="flex-auto bg-green-300 py-2">
                <form className="flex flex-wrap" onSubmit={handleAddToCart}>
                  <ProductList list={products} handleChange={handleChange} />
                  <QuantitySelector
                    currentAmount={quantity}
                    maxAmount={selected?.maxAmount}
                    handleAmountChange={handleAmountChange}
                  />
                  {selected ? <p>{selected.productName}</p> : null}
                  <p>{quantity}</p>
                  <Button title="Add to Cart" />
                </form>
              </main>
              <Cart isCartClosed={isCartClosed} items={cartItems} />
            </div>
          </div>
        </div>
        <footer className="flex h-14 items-center justify-center bg-orange-300">
          <p>Progress Bar</p>
        </footer>
      </div>
    </div>
  )
}

export default App
