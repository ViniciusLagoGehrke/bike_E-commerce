import { useState } from 'react'
import ProductList from './ProductList'
import QuantitySelector from './QuantitySelector'
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

  return (
    <div className="bg-white">
      <div className="mx-auto flex h-screen max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-auto">
          <div className="flex flex-auto flex-col">
            <header className="flex">
              <h1 className="w-3/5 flex-auto bg-blue-300 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Your Shop!
              </h1>
              <aside className="bg-blue-600 sm:w-64" onClick={toggleCart}>
                <p>Total Amount</p>
              </aside>
            </header>
            <div className="relative flex flex-auto">
              <main className="flex w-3/5 flex-auto flex-wrap bg-green-300">
                <ProductList list={products} handleChange={handleChange} />
                <QuantitySelector
                  maxAmount={selected?.maxAmount ?? 1}
                  handleAmountChange={handleAmountChange}
                />
                {selected ? <p>{selected.productName}</p> : null}
                <p>{quantity}</p>
              </main>
              <aside
                className={`${
                  isCartClosed ? 'hidden' : 'absolute'
                } h-full w-full bg-pink-300 sm:relative sm:w-64`}
              >
                <p>Cart</p>
              </aside>
            </div>
          </div>
        </div>
        <footer className="h-14 bg-orange-300">
          <p>Progress Bar</p>
        </footer>
      </div>
    </div>
  )
}

export default App
