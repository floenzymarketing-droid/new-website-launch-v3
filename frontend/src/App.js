import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Filtration from "./pages/Filtration";
import TheWater from "./pages/TheWater";
import Gallery from "./pages/Gallery";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import OurStory from "./pages/OurStory";
import Checkout from "./pages/Checkout";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);
  return null;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CartProvider>
          <ScrollToTop />
          <Header />
          <CartDrawer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/the-water" element={<TheWater />} />
            <Route path="/filtration" element={<Filtration />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/hard-water-shower-filter-head-beige" element={<ProductDetail slugOverride="hard-water-filter-beige" />} />
            <Route path="/shop/:slug" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <Footer />
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
