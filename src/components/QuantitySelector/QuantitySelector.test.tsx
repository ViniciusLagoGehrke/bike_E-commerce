import { describe, expect, it, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import QuantitySelector from './QuantitySelector'

describe('QuantitySelector component', () => {
  const handleInputChangeMock = vi.fn()

  beforeEach(() => {
    handleInputChangeMock.mockClear()
  })

  it('should render the QuantitySelector component', () => {
    const { getByLabelText } = render(
      <QuantitySelector
        maxAmount={5}
        handleAmountChange={handleInputChangeMock}
      />
    )

    const input = getByLabelText('Quantity') as HTMLInputElement

    expect(input).toBeInTheDocument()
    expect(input.type).toBe('number')
    expect(input.min).toBe('1')
    expect(input.max).toBe('5')
    expect(input.value).toBe('1')
  })

  it('should call handleInputChange when the input value changes', () => {
    const { getByLabelText } = render(
      <QuantitySelector
        maxAmount={5}
        handleAmountChange={handleInputChangeMock}
      />
    )

    const input = getByLabelText('Quantity') as HTMLInputElement

    fireEvent.change(input, { target: { value: '2' } })

    expect(handleInputChangeMock).toHaveBeenCalledTimes(1)
    expect(handleInputChangeMock).toHaveBeenCalledWith(expect.any(Object))
  })

  it('should not allow the input value to exceed maxAmount', () => {
    const { getByLabelText } = render(
      <QuantitySelector
        // amount={1}
        maxAmount={5}
        handleAmountChange={handleInputChangeMock}
      />
    )

    const input = getByLabelText('Quantity') as HTMLInputElement

    fireEvent.change(input, { target: { value: '6' } })

    expect(handleInputChangeMock).toHaveBeenCalledTimes(1)
    expect(input.value).toBe('1')
  })
})
