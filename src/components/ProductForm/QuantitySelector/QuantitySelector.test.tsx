import { vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import QuantitySelector from './QuantitySelector'

describe('QuantitySelector component', () => {
  const handleInputChangeMock = vi.fn()
  const MAX_AMOUNT = 5

  beforeEach(() => {
    handleInputChangeMock.mockClear()
  })

  it('should render the QuantitySelector component', () => {
    const { getByRole } = render(
      <QuantitySelector
        currentAmount={1}
        maxAmount={MAX_AMOUNT}
        handleAmountChange={handleInputChangeMock}
      />
    )

    const input = getByRole('spinbutton') as HTMLInputElement

    expect(input).toBeInTheDocument()
    expect(input.type).toBe('number')
    expect(input.min).toBe('1')
    expect(input.max).toBe('5')
    expect(input.value).toBe('1')
  })

  it('should call handleInputChange when the input value changes', () => {
    const { getByRole } = render(
      <QuantitySelector
        currentAmount={1}
        maxAmount={MAX_AMOUNT}
        handleAmountChange={handleInputChangeMock}
      />
    )

    const input = getByRole('spinbutton') as HTMLInputElement

    fireEvent.change(input, { target: { value: '2' } })

    expect(handleInputChangeMock).toHaveBeenCalledTimes(1)
    expect(handleInputChangeMock).toHaveBeenCalledWith(2)
  })

  it('should not allow the input value to exceed maxAmount', () => {
    const { getByRole } = render(
      <QuantitySelector
        currentAmount={1}
        maxAmount={MAX_AMOUNT}
        handleAmountChange={handleInputChangeMock}
      />
    )

    const input = getByRole('spinbutton') as HTMLInputElement

    fireEvent.change(input, { target: { value: '6' } })

    expect(handleInputChangeMock).toHaveBeenCalledTimes(1)
    expect(parseInt(input.value)).toBe(MAX_AMOUNT)
  })
})
