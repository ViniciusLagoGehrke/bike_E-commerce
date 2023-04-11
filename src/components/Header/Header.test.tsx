import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ShoppingCartProvider } from '../../store/CartStore'
import Header from './Header'

describe('Header', () => {
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
    total: 50,
    maxProductsReached: false,
    MAX_ITEMS: 10,
    isCartClosed: true,
    message: ''
  }

  const mockDispatch = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    render(
      <ShoppingCartProvider
        mockValue={{ state: mockState, dispatch: mockDispatch }}
      >
        <Header />
      </ShoppingCartProvider>
    )
  })

  it('should render the header', () => {
    expect(screen.getByText('Your Shop!')).toBeInTheDocument()
    expect(
      screen.getByText(`Gross Total: $${mockState.total.toFixed(2)}`)
    ).toBeInTheDocument()
    expect(screen.getByTestId('shopping-cart-toggle')).toBeInTheDocument()
  })

  it('renders the correct text and total amount', () => {
    const shopTitle = screen.getByText('Your Shop!')
    const totalAmount = screen.getByText(new RegExp('50', 'i'))

    expect(shopTitle).toBeInTheDocument()
    expect(totalAmount).toBeInTheDocument()
  })

  it('should open the cart when it is closed and the shopping cart button is clicked', () => {
    fireEvent.click(screen.getByTestId('shopping-cart-toggle'))

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'OPEN_CART' })
  })

  it('should close the cart when it is open and the shopping cart button is clicked', () => {
    mockState.isCartClosed = false

    fireEvent.click(screen.getByTestId('shopping-cart-toggle'))
    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'CLOSE_CART' })
  })
})
