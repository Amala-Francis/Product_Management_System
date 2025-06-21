import './App.css';
import AddProduct from './components/Addproduct';
import Product from './components/Product';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ✅ import these
import Navbar from './components/Navbar'; // ✅ import your Navbar
import UpdateProduct from './components/Updateproduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;