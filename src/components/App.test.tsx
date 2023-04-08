import { render, screen } from '@testing-library/react'

import App from './App'

describe('<App />', () => {
  it('should render the App', () => {
    render(<App />)
    const heading = screen.getByRole('heading', {
      name: /Your Shop!/i,
      level: 1
    })

    expect(heading).toBeInTheDocument()
  })

  it('should contain a Product Dropdown', () => {
    render(<App />)

    const dropdown = screen.getByRole('menu')
    expect(dropdown).toBeInTheDocument()
  })
})
