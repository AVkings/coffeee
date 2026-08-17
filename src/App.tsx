import { ShopProvider } from "./context/ShopContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Featured from "./components/Featured";
import MenuSection from "./components/MenuSection";
import CraftSection from "./components/CraftSection";
import BookingSection from "./components/BookingSection";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import Toasts from "./components/Toasts";

export default function App() {
  return (
    <ShopProvider>
      <div className="relative min-h-screen">
        <div className="ambient-glow" aria-hidden />
        <div className="grain-overlay" aria-hidden />
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <Ticker />
          <Featured />
          <MenuSection />
          <CraftSection />
          <BookingSection />
        </main>
        <div className="relative z-10">
          <Footer />
        </div>
        <CartDrawer />
        <CheckoutModal />
        <Toasts />
      </div>
    </ShopProvider>
  );
}
