import { vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import ProductList from './ProductList'
import products from '../../../../data/products.json'

describe('ProductList', () => {
  it('renders a dropdown with product names', () => {
    const handleChange = vi.fn()
    const { getAllByRole, getByRole } = render(
      <ProductList list={products} handleChange={handleChange} />
    )
    const dropdown = getByRole('menu')
    const options = getAllByRole('option')

    expect(dropdown).toBeInTheDocument()
    expect(options).toHaveLength(products.length)
  })

  it('calls handleChange when a product is selected', () => {
    const handleChange = vi.fn()
    const { getByRole } = render(
      <ProductList list={products} handleChange={handleChange} />
    )
    const dropdown = getByRole('menu')
    expect(dropdown).toBeInTheDocument()

    const selectedProduct = products[1]
    fireEvent.change(dropdown, { target: { value: selectedProduct.id } })
    const firsCall = handleChange.mock.calls[0]
    const firstEvent = firsCall[0]

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object))
    expect(firstEvent.target.value).toBe(selectedProduct.id)
  })
})
