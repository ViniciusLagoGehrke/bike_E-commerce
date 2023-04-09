import { useState } from 'react'
import Header from './Header'
import ProductForm from './ProductForm'
import Cart from './Cart'
import { ProductType } from '../types'
import products from '../../data/products.json'
import Footer from './Footer'

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
    },
    {
      ...products[2],
      quantity
    },
    {
      ...products[3],
      quantity
    },
    {
      ...products[4],
      quantity
    },
    {
      ...products[5],
      quantity
    },
    {
      ...products[6],
      quantity
    },
    {
      ...products[7],
      quantity
    },
    {
      ...products[8],
      quantity
    },
    {
      ...products[9],
      quantity
    }
  ]

  const calculateTotal = (
    items: (ProductType & { quantity: number })[]
  ): number => {
    const sum = items.reduce((acc, cur) => acc + cur.quantity * cur.price, 0)
    return parseFloat(sum.toFixed(2))
  }

  const handleAddToCart = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('added to cart')
  }

  return (
    <div className="bg-white">
      <div className="flex h-screen w-screen flex-col">
        <div className="relative flex flex-auto flex-col">
          <Header toggle={toggleCart} totalAmount={calculateTotal(cartItems)} />
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
        <Footer totalItems={3} />
      </div>
    </div>
  )
}

export default App
