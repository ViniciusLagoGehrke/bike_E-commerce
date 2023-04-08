import { ProductType } from '../../types'

type DropdownProps = {
  list: ProductType[]
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

function ProductList({ list, handleChange }: DropdownProps) {
  return (
    <div className="flex flex-col pl-2">
      <label htmlFor="product-dropdown" />
      <select
        className="h-10 rounded-md border border-slate-300 bg-white p-2 text-sm shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1
              focus:ring-sky-500"
        name="product-dropdown"
        id="product-dropdown"
        role="menu"
        onChange={handleChange}
      >
        <option value="" disabled hidden>
          Select a Product
        </option>
        {list?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.productName}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ProductList
