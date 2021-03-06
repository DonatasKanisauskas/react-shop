import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './assets/styles/App.sass';
import './assets/styles/Layout.sass';
import Products from './components/Products';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Cart from "./components/Cart";
import ProductView from "./components/ProductView";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="content_box">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/:category/products" element={<Products/>} />
          <Route path="/products/:id" element={<ProductView />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
