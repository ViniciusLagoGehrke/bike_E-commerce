import { useState } from 'react'
import Header from './Header'
import ProductForm from './ProductForm'
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
        <div className="relative flex flex-auto flex-col">
          <Header toggle={toggleCart} totalAmount={calculateTotal()} />
          <div className="relative flex flex-auto">
            <main className="flex-auto py-2">
              <ProductForm
                products={products}
                quantity={quantity}
                selected={selected}
                handleAddToCart={handleAddToCart}
                handleChange={handleChange}
                handleAmountChange={handleAmountChange}
              />
            </main>
            <Cart isCartClosed={isCartClosed} items={cartItems} />
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
