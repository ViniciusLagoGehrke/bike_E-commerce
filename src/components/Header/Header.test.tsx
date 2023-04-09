import { vi } from 'vitest'
import { render } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  it('renders the correct text and total amount', () => {
    const toggleMock = vi.fn()
    const { getByText } = render(
      <Header toggle={toggleMock} totalAmount={50} />
    )

    const shopTitle = getByText('Your Shop!')
    const totalAmount = getByText('Total: $50')

    expect(shopTitle).toBeInTheDocument()
    expect(totalAmount).toBeInTheDocument()
  })

  it('calls the toggle function when clicked', () => {
    const toggleMock = vi.fn()
    const { getByTestId } = render(
      <Header toggle={toggleMock} totalAmount={0} />
    )
    const cartIcon = getByTestId('shopping-cart-toggle')
    cartIcon.click()
    expect(toggleMock).toHaveBeenCalled()
  })
})
