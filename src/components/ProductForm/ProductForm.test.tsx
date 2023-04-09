import { vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import ProductForm from './ProductForm'
import { ProductType } from '../../types'

const products: ProductType[] = [
  {
    id: '1',
    productName: 'Product 1',
    maxAmount: 10,
    taxRate: 1,
    price: 1.99
  },
  {
    id: '2',
    productName: 'Product 2',
    maxAmount: 5,
    taxRate: 1,
    price: 5.99
  }
]

describe('ProductForm component', () => {
  it('renders ProductList, QuantitySelector, Button, and selected product info', () => {
    const { getByRole } = render(<ProductForm products={products} />)

    const productList = getByRole('menu')
    expect(productList).toBeInTheDocument()

    const quantitySelector = getByRole('spinbutton') as HTMLInputElement
    expect(quantitySelector).toBeInTheDocument()

    const button = getByRole('button', { name: /add to cart/i })
    expect(button).toBeInTheDocument()
  })

  it('calls handleAddToCart when form is submitted', () => {
    const handleAddToCart = vi.fn()

    const { getByTestId } = render(<ProductForm products={products} />)

    const form = getByTestId('product-form')
    fireEvent.submit(form)

    expect(handleAddToCart).toHaveBeenCalled()
  })

  it('calls handleChange when product selection changes', () => {
    const handleChange = vi.fn()

    const { getByRole } = render(<ProductForm products={products} />)

    const dropdown = getByRole('menu')
    fireEvent.change(dropdown, { target: { value: '2' } })

    expect(handleChange).toHaveBeenCalledWith(expect.any(Object))
  })

  it('calls handleAmountChange when quantity selection changes', () => {
    const handleAmountChange = vi.fn()

    const { getByRole } = render(<ProductForm products={products} />)
    const quantitySelect = getByRole('spinbutton') as HTMLInputElement

    fireEvent.change(quantitySelect, { target: { value: '2' } })

    expect(handleAmountChange).toHaveBeenCalledTimes(1)
    expect(handleAmountChange).toHaveBeenCalledWith(2)
  })
})
