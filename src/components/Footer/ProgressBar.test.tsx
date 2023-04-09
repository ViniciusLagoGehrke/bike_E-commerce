import { render } from '@testing-library/react'
import ProgressBar, { ProgressBarProps } from './ProgressBar'

describe('ProgressBar', () => {
  const props: ProgressBarProps = {
    min: 0,
    max: 10,
    progress: 5
  }

  it('displays the remaining types and progress bar', () => {
    const { getByText, getByRole } = render(<ProgressBar {...props} />)

    const text = getByText('5 types left to add')
    const progressbar = getByRole('progressbar')

    expect(text).toBeInTheDocument()
    expect(progressbar).toHaveAttribute('aria-valuenow', '50')
    expect(progressbar).toHaveStyle({ width: '50%' })
  })

  it('displays singular text when only 1 type is remaining', () => {
    const singularProps: ProgressBarProps = {
      min: 0,
      max: 10,
      progress: 9
    }
    const { getByText } = render(<ProgressBar {...singularProps} />)
    const text = getByText('1 type left to add')

    expect(text).toBeInTheDocument()
  })

  it('displays plural text when more than 1 type is remaining', () => {
    const pluralProps: ProgressBarProps = {
      min: 0,
      max: 10,
      progress: 8
    }
    const { getByText } = render(<ProgressBar {...pluralProps} />)
    const text = getByText('2 types left to add')

    expect(text).toBeInTheDocument()
  })

  it('displays red progress bar when no items are remaining', () => {
    const noRemainingProps: ProgressBarProps = {
      min: 0,
      max: 10,
      progress: 10
    }
    const { getByRole } = render(<ProgressBar {...noRemainingProps} />)
    const progressbar = getByRole('progressbar')

    expect(progressbar).toHaveClass('bg-red-500')
  })

  it('displays green progress bar when items are remaining', () => {
    const { getByRole } = render(<ProgressBar {...props} />)
    const progressbar = getByRole('progressbar')

    expect(progressbar).toHaveClass('bg-green-500')
  })
})
