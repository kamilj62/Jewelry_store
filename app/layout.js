import "./globals.css"; // Ensure global styles are imported
import Header from "./components/header"; // Adjust the path if necessary
import CartContextProvider from "./store/shopping-cart-context";

export const metadata = {
  title: "Jewelry Store",
  description: "Elegant Jewelry Store",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartContextProvider>
          <div className="app-container flex flex-col items-center justify-center">
            <Header />
            <main>{children}</main>
          </div>
        </CartContextProvider>
      </body>
    </html>
  );
}
