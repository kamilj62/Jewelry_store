import "./globals.css"; // Ensure global styles are imported
import Header from "./components/header"; // Adjust the path if necessary
import CartContextProvider from "./store/shopping-cart-context";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartContextProvider>
          <div className="app-container"> {/* ✅ Wrap content inside a div */}
            <Header /> {/* ✅ Now safely inside <body> */}
            <main>{children}</main>
          </div>
        </CartContextProvider>
      </body>
    </html>
  );
}
