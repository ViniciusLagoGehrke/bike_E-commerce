import ProductList from '../ProductList'
import QuantitySelector from '../QuantitySelector'
import Button from '../Button'
import { ProductType } from '../../types'

type ProductFormPros = {
  products: ProductType[]
  quantity: number
  selected: ProductType | null
  handleAddToCart: React.FormEventHandler<HTMLFormElement>
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  handleAmountChange: (newAmount: number) => void
}

function ProductForm({
  products,
  quantity,
  selected,
  handleAddToCart,
  handleChange,
  handleAmountChange
}: ProductFormPros) {
  const subtotal = selected?.price ? quantity * selected?.price : 0

  return (
    <form
      data-TestId="product-form"
      className="flex flex-wrap items-center"
      onSubmit={handleAddToCart}
    >
      <ProductList list={products} handleChange={handleChange} />
      <QuantitySelector
        currentAmount={quantity}
        maxAmount={selected?.maxAmount}
        handleAmountChange={handleAmountChange}
      />
      <div className="mb-2 px-4">
        <p>
          x <span className="px-2">{selected?.price ?? 0}</span> ={' '}
          <span className="px-2">{subtotal}</span>
        </p>
      </div>
      <Button className="mb-2" title="Add to Cart" />
    </form>
  )
}

export default ProductForm
