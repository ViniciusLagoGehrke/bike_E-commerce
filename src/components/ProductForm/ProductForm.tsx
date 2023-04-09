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
  return (
    <form
      data-TestId="product-form"
      className="flex flex-wrap"
      onSubmit={handleAddToCart}
    >
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
  )
}

export default ProductForm
