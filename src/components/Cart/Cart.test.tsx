import { render } from '@testing-library/react'
import Cart from './Cart'
import CartItem from './CartItem'
import { CartItemType } from '../../types'

describe('Cart', () => {
  const items: CartItemType[] = [
    {
      id: '1',
      productName: 'Product 1',
      price: 10,
      taxRate: 0.2,
      quantity: 2
    },
    {
      id: '2',
      productName: 'Product 2',
      price: 5,
      taxRate: 0.1,
      quantity: 3
    }
  ]

  it('renders the component with the correct props', () => {
    const { getByText } = render(<Cart isCartClosed={false} items={items} />)

    const product1Name = getByText('Product 1')
    const product1Price = getByText('$10')
    const product1Quantity = getByText('2')
    const product1Amount = getByText('$20')
    const product2Name = getByText('Product 2')
    const product2Price = getByText('$5')
    const product2Quantity = getByText('3')
    const product2Amount = getByText('$15')

    expect(product1Name).toBeInTheDocument()
    expect(product1Price).toBeInTheDocument()
    expect(product1Quantity).toBeInTheDocument()
    expect(product1Amount).toBeInTheDocument()
    expect(product2Name).toBeInTheDocument()
    expect(product2Price).toBeInTheDocument()
    expect(product2Quantity).toBeInTheDocument()
    expect(product2Amount).toBeInTheDocument()
  })
})

describe('CartItem', () => {
  const product: CartItemType = {
    id: '1',
    productName: 'Product 1',
    price: 10,
    taxRate: 0.2,
    quantity: 2
  }

  it('renders the component with the correct props', () => {
    const { getByText } = render(
      <table>
        <tbody>
          <CartItem
            id={product.id}
            productName={product.productName}
            price={product.price}
            taxRate={product.taxRate}
            quantity={product.quantity}
          />
        </tbody>
      </table>
    )

    const productName = getByText('Product 1')
    const price = getByText('$10')
    const productQuantity = getByText('2')
    const amount = getByText('$20')

    expect(productName).toBeInTheDocument()
    expect(price).toBeInTheDocument()
    expect(productQuantity).toBeInTheDocument()
    expect(amount).toBeInTheDocument()
  })
})
