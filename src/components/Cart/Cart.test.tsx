import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Cart from './Cart'
import { ShoppingCartProvider } from '../../cartStore/ShoppingCart'

describe('Cart', () => {
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
        <Cart />
      </ShoppingCartProvider>
    )
  })

  it('renders Cart component', () => {
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('should not display the cart when it is closed', () => {
    expect(screen.getByRole('complementary')).toHaveClass('hidden')
  })

  it('displays items in the cart', () => {
    expect(screen.getAllByTestId('cart-item')).toHaveLength(mockItems.length)
  })

  it('should remove the correct item when its delete button is clicked', () => {
    const deleteButton = screen.getAllByTestId('delete-item-button')
    const firstDeleteButton = deleteButton[0]

    fireEvent.click(firstDeleteButton)

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'REMOVE_ITEM',
      payload: { index: 0 as number }
    })
  })

  it('clears cart when Clear Cart button is clicked', () => {
    const clearCartButton = screen.getByText('Clear Cart')
    fireEvent.click(clearCartButton)

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'CLEAR_CART' })
  })

  it('alerts purchase confirmation when Buy button is clicked', () => {
    const buyButton = screen.getByText('Buy!')
    fireEvent.click(buyButton)

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'PURCHASE' })
  })
})
