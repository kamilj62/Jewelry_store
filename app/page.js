import Header from "./components/header";
import Shop from "./components/shop";
import Product from "./components/product";
import { DUMMY_PRODUCTS } from "./dummy-products.js";
import CartContextProvider from "./store/shopping-cart-context";

function App() {
  return (
    <Shop>
      {DUMMY_PRODUCTS.map((product) => (
        <li key={product.id}>
          <Product {...product} />
        </li>
      ))}
    </Shop>
  );
}

export default App;
