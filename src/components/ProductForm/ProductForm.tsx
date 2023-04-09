import { useState } from 'react'
import ProductList from './ProductList'
import QuantitySelector from './QuantitySelector'
import Button from '../Button'
import { useShoppingCart } from '../../Store/ShoppingCart'
import { ProductType, CartItemType } from '../../types'

type ProductFormPros = {
  products: ProductType[]
}

const initialState = {
  id: '',
  productName: '',
  price: 0,
  maxAmount: 0,
  taxRate: 0,
  quantity: 1
}

function ProductForm({ products }: ProductFormPros) {
  const [selected, setSelected] =
    useState<Omit<CartItemType, 'index'>>(initialState)
  const { dispatch } = useShoppingCart()

  // Do not wrap in useMemo, Should be computed on every render
  const subtotal = selected?.price ? selected.quantity * selected?.price : 0

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
    setSelected(initialState)
  }

  return (
    <form
      data-testid="product-form"
      className="flex flex-col"
      onSubmit={handleAddToCart}
    >
      <div className="flex flex-wrap items-center">
        <ProductList list={products} handleChange={handleProductSelection} />
        <QuantitySelector
          currentAmount={selected.quantity}
          maxAmount={selected.maxAmount}
          handleAmountChange={handleAmountChange}
        />
        <div className="mb-2 px-4">
          <p>
            x <span className="px-2">{selected?.price ?? 0}</span> ={' '}
            <span data-testid="subtotal" className="px-2">
              {subtotal}
            </span>
          </p>
        </div>
      </div>
      <Button className="ml-2 mb-2 w-40" title="Add to Cart" />
    </form>
  )
}

export default ProductForm
