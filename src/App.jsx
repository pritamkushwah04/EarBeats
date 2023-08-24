import { useEffect } from 'react';
import ProductDetail from './components/ProductDetail';
import Navbar from './components/Navbar';
import ProductDisplay from './components/ProductDisplay';
function App() {
  return (
    <div className='bg-white'>
      <Navbar />
      <div 
      className='flex justify-start flex-wrap md:flex-nowrap sm:mt-12 bg-white'
      >
        <ProductDisplay/>
        <ProductDetail />
      </div>
    </div>

  )
}

export default App;