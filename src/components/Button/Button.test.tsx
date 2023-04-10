import { vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps } from './Button'

describe('Button', () => {
  const defaultProps: ButtonProps = {
    title: 'Click me',
    onClick: vi.fn()
  }

  it('renders with the default "primary" style', () => {
    const { getByRole } = render(<Button {...defaultProps} />)
    const button = getByRole('button')

    expect(button).toHaveClass('bg-indigo-600')
  })

  it('renders with the "secondary" style when buttonStyle is set to "secondary"', () => {
    const { getByRole } = render(
      <Button {...defaultProps} buttonStyle="secondary" />
    )
    const button = getByRole('button')

    expect(button).toHaveClass('bg-slate-400')
  })

  it('renders as a link when buttonType is set to "link"', () => {
    const { getByRole } = render(<Button {...defaultProps} buttonType="link" />)
    const link = getByRole('link')

    expect(link).toHaveAttribute('href', '/')
  })

  it('calls the onClick function when clicked', () => {
    const { getByRole } = render(<Button {...defaultProps} />)
    const button = getByRole('button')

    fireEvent.click(button)

    expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
  })
})
