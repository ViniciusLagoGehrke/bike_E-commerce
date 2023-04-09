import { ShoppingCartProvider } from '../Store/ShoppingCart'
import Header from './Header'
import ProductForm from './ProductForm'
import Cart from './Cart'
import Footer from './Footer'
import products from '../../data/products.json'

function App() {
  return (
    <ShoppingCartProvider>
      <div className="bg-white">
        <div className="flex h-screen w-screen flex-col">
          <div className="relative flex flex-auto flex-col">
            <Header />
            <div className="relative flex flex-auto">
              <main className="flex-auto py-2">
                <ProductForm products={products} />
              </main>
              <Cart />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </ShoppingCartProvider>
  )
}

export default App
