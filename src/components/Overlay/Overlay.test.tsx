import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ShoppingCartProvider } from '../../cartStore/ShoppingCart'
import OverlayWrapper from './OverlayWrapper'
import { State } from 'cartStore/Reducer'

describe('OverlayWrapper', () => {
  const MockMessage = 'TESTING'

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

  const mockState: State = {
    cartItems: mockItems,
    total: 40,
    maxProductsReached: false,
    MAX_ITEMS: 10,
    isCartClosed: true,
    message: MockMessage
  }

  const mockDispatch = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    render(
      <ShoppingCartProvider
        mockValue={{ state: mockState, dispatch: mockDispatch }}
      >
        <OverlayWrapper>
          <div>child</div>
        </OverlayWrapper>
      </ShoppingCartProvider>
    )
  })

  it('renders children when there is no message', () => {
    mockState.message = null

    const childElement = screen.getByText('child')

    expect(childElement).toBeInTheDocument()

    mockState.message = MockMessage
  })

  it('renders OverlayCard when there is a message', () => {
    const overlayCard = screen.getByTestId('overlay-card')
    const childElement = screen.queryByText('Hello World')

    expect(overlayCard).toBeInTheDocument()
    expect(childElement).toBeNull()
  })

  it('calls dispatch with CLEAR_MESSAGE action when OverlayCard is closed', () => {
    const closeButton = screen.getByTestId('overlay-close-button')

    fireEvent.click(closeButton)

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'CLEAR_MESSAGE' })
  })
})
