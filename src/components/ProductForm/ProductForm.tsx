import { useState } from 'react'
import ProductList from './ProductList'
import QuantitySelector from './QuantitySelector'
import Button from '../Button'
import { useShoppingCart } from '../../cartStore/ShoppingCart'
import { ProductType, CartItemType } from '../../types'

type ProductFormPros = {
  products: ProductType[]
}

const initialState = {
  id: '',
  productName: '',
  price: 0,
  maxAmount: 10,
  taxRate: 0,
  quantity: 1
}

function ProductForm({ products }: ProductFormPros) {
  const [selected, setSelected] =
    useState<Omit<CartItemType, 'index'>>(initialState)
  const { dispatch } = useShoppingCart()

  // Do not wrap in useMemo, Should be computed on every render
  const { quantity, price, maxAmount } = selected
  const subtotal = price ? quantity * price : 0

  const handleProductSelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedProductId = event.target.value
    const selectedProduct = products.find(
      (product) => product.id === selectedProductId
    )
    selectedProduct && setSelected({ ...selected, ...selectedProduct })
  }

  const handleAmountChange = (value: number) => {
    setSelected({ ...selected, quantity: value })
  }

  const handleAddToCart: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    dispatch({ type: 'ADD_ITEM', payload: { item: selected } })
  }

  return (
    <form
      data-testid="product-form"
      className="flex flex-wrap justify-center gap-8"
      onSubmit={handleAddToCart}
    >
      <div className="flex flex-wrap items-center justify-center gap-4">
        <ProductList list={products} handleChange={handleProductSelection} />
        <QuantitySelector
          max={maxAmount}
          defaultValue={quantity}
          handleAmountChange={handleAmountChange}
        />
        <div className="pl-2">
          <p>
            x{' '}
            <span
              data-testid="current-price"
              className="inline-block w-20 px-2 text-center sm:px-4"
            >
              {price}
            </span>{' '}
            ={' '}
            <span
              data-testid="subtotal"
              className="inline-block w-24 px-2 text-center sm:px-4"
            >
              {subtotal.toFixed(2)}
            </span>
          </p>
        </div>
      </div>
      <Button className="" title="Add to Cart" />
    </form>
  )
}

export default ProductForm
