import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import QuantitySelector from './QuantitySelector'

describe('QuantitySelector', () => {
  const mockHandleAmountChange = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    render(
      <QuantitySelector
        handleAmountChange={mockHandleAmountChange}
        defaultValue={1}
      />
    )
  })

  it('renders with default props', () => {
    const slider = screen.getByRole('slider')
    const input = screen.getByRole('spinbutton') as HTMLInputElement

    expect(screen.getByLabelText(/Amount/)).toBeInTheDocument()
    expect(slider).toHaveAttribute('min', '1')
    expect(slider).toHaveAttribute('max', '10')
    expect(slider).toHaveAttribute('defaultvalue', '1')
    expect(input).toHaveAttribute('min', '1')
    expect(input).toHaveAttribute('max', '10')
    expect(input).toHaveAttribute('defaultvalue', '1')
  })

  it('updates the slider when the input is changed', () => {
    const slider = screen.getByRole('slider')
    const input = screen.getByRole('spinbutton') as HTMLInputElement

    fireEvent.change(input, { target: { value: '5' } })

    expect(slider).toHaveAttribute('defaultvalue', '5')
  })

  it('updates the input when the slider is changed', () => {
    const slider = screen.getByRole('slider')
    const input = screen.getByRole('spinbutton') as HTMLInputElement

    fireEvent.change(slider, { target: { value: '5' } })

    expect(input).toHaveAttribute('defaultValue', '5')
  })

  it('calls handleAmountChange with the new value when either the slider or the input is changed', () => {
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '5' } })

    expect(mockHandleAmountChange).toHaveBeenCalledWith(5)

    fireEvent.change(screen.getByRole('slider'), { target: { value: '7' } })

    expect(mockHandleAmountChange).toHaveBeenCalledWith(7)
  })

  it('should not allow the input value to exceed maxAmount', () => {
    const input = screen.getByRole('spinbutton') as HTMLInputElement

    fireEvent.change(input, { target: { value: '12' } })

    expect(mockHandleAmountChange).toHaveBeenCalledTimes(1)
    expect(parseInt(input.value)).toBe(10)
  })
})
