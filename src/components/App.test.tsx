import { render } from '@testing-library/react'

import App from './App'

describe('<App />', () => {
  it('should render the App', () => {
    const { getByRole } = render(<App />)
    const heading = getByRole('heading', {
      name: /Your Shop!/i,
      level: 1
    })

    expect(heading).toBeInTheDocument()
  })

  it('should contain a Product Dropdown', () => {
    const { getByRole } = render(<App />)

    const dropdown = getByRole('menu')
    expect(dropdown).toBeInTheDocument()
  })
})
