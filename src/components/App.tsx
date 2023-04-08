import { useState } from 'react'
import ProductList from './ProductList'
import QuantitySelector from './QuantitySelector'
import { ProductType } from '../types'
import products from '../../data/products.json'

function App() {
  const [selected, setSelected] = useState<ProductType | null>(null)
  const [quantity, setQuantity] = useState<number>(1)

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

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="h-screen sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Your Shop!
            </h1>
            <ProductList list={products} handleChange={handleChange} />
            <QuantitySelector
              maxAmount={selected?.maxAmount ?? 1}
              handleAmountChange={handleAmountChange}
            />
          </div>
          {selected ? <p>{selected.productName}</p> : null}
          <p>{quantity}</p>
        </div>
      </div>
    </div>
  )
}

export default App
