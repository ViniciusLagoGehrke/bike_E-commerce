import { vi } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import { ShoppingCartProvider } from '../../cartStore/ShoppingCart'
import ProductForm from './ProductForm'

describe('ProductForm', () => {
  const products = [
    {
      id: '1',
      productName: 'Product 1',
      price: 10,
      maxAmount: 5,
      taxRate: 0.05
    },
    {
      id: '2',
      productName: 'Product 2',
      price: 20,
      maxAmount: 10,
      taxRate: 0.1
    }
  ]

  const mockItems = [
    {
      id: '1',
      productName: 'Product 1',
      price: 10.0,
      taxRate: 0.05,
      maxAmount: 2,
      quantity: 2
    },
    {
      id: '2',
      productName: 'Product 2',
      price: 20.0,
      taxRate: 0.1,
      maxAmount: 2,
      quantity: 1
    }
  ]

  const mockState = {
    cartItems: mockItems,
    total: 40,
    maxProductsReached: false,
    MAX_ITEMS: 10,
    isCartClosed: true,
    message: null
  }

  const mockDispatch = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    render(
      <ShoppingCartProvider
        mockValue={{ state: mockState, dispatch: mockDispatch }}
      >
        <ProductForm products={products} />
      </ShoppingCartProvider>
    )
  })

  it('renders product options', () => {
    const productSelect = screen.getByRole('menu')

    expect(productSelect).toBeInTheDocument()
    expect(productSelect).toHaveDisplayValue(['Select a Product'])
  })

  it('updates selected product on change', () => {
    const productSelect = screen.getByRole('menu')

    fireEvent.change(productSelect, { target: { value: '2' } })

    expect(productSelect).toHaveValue('2')
  })

  it('updates selected quantity on change', () => {
    const productSelect = screen.getByRole('menu')
    fireEvent.change(productSelect, { target: { value: '2' } })

    const quantityInput = screen.getByRole('spinbutton') as HTMLInputElement
    fireEvent.change(quantityInput, { target: { value: '2' } })

    expect(quantityInput).toHaveValue(2)
  })

  it('display zero or the price of the current selected product', () => {
    const productSelect = screen.getByRole('menu')
    const displayedPrice = screen.getByTestId('current-price')

    expect(displayedPrice).toBeInTheDocument()
    expect(displayedPrice).toHaveTextContent('0')

    fireEvent.change(productSelect, { target: { value: '2' } })

    expect(displayedPrice).toHaveTextContent('20')
  })

  it('computes subtotal on product and quantity change', () => {
    const productSelect = screen.getByRole('menu')
    const quantityInput = screen.getByRole('spinbutton') as HTMLInputElement
    const subtotal = screen.getByTestId('subtotal')

    expect(subtotal).toBeInTheDocument()

    fireEvent.change(productSelect, { target: { value: '2' } })
    fireEvent.change(quantityInput, { target: { value: '3' } })

    expect(subtotal).toHaveTextContent('60')
  })

  it('adds selected product to cart on submit', () => {
    fireEvent.change(screen.getByRole('menu'), { target: { value: '1' } })
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '2' } })
    fireEvent.submit(screen.getByTestId('product-form'))

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_ITEM',
      payload: {
        item: {
          id: '1',
          productName: 'Product 1',
          price: 10,
          maxAmount: 5,
          taxRate: 0.05,
          quantity: 2
        }
      }
    })
  })
})
