import { ProductType } from '../../types'

type DropdownProps = {
  list: ProductType[]
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

function ProductList({ list, handleChange }: DropdownProps) {
  return (
    <>
      <label htmlFor="product-dropdown" />
      <select
        name="product-dropdown"
        id="product-dropdown"
        role="menu"
        onChange={handleChange}
      >
        {list?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.productName}
          </option>
        ))}
      </select>
    </>
  )
}

export default ProductList
