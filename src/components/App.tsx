import { ShoppingCartProvider } from '../store/ShoppingCart'
import OverlayWrapper from './Overlay'
import Header from './Header'
import ProductForm from './ProductForm'
import Cart from './Cart'
import Footer from './Footer'
import products from '../../data/products.json'

function App() {
  return (
    <ShoppingCartProvider>
      <div className="bg-white">
        <OverlayWrapper>
          <div className="flex h-screen w-screen flex-col">
            <div className="relative flex flex-auto flex-col">
              <Header />
              <div className="relative flex flex-auto">
                <main className="flex-auto py-4 sm:p-12">
                  <ProductForm products={products} />
                </main>
                <Cart />
              </div>
            </div>
            <Footer />
          </div>
        </OverlayWrapper>
      </div>
    </ShoppingCartProvider>
  )
}

export default App
