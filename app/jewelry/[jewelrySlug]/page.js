"use client"; // ✅ Required for Client Component

import { useContext } from "react";
import { useParams, notFound } from "next/navigation";
import { CartContext } from "../../store/shopping-cart-context";

const products = [
  {
    id: "p1",
    image: "/assets/Jewelry-1.jpg",
    title: "Elegant Earrings",
    price: 129.99,
    description: "A pair of elegant earrings perfect for any occasion.",
    slug: "elegant-earrings",
  },
  {
    id: "p2",
    image: "/assets/Jewelry-2.jpg",
    title: "Elegant Necklace",
    price: 189.99,
    description: "A beautifully designed necklace for elegance and style.",
    slug: "elegant-necklace",
  },
];

export default function ProductPage() {
  const { jewelrySlug } = useParams(); // ✅ Correct way to access params

  const product = products.find((p) => p.slug === jewelrySlug);

  if (!product) {
    return notFound();
  }

  const { addItemToCart } = useContext(CartContext);

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">
      <article className="max-w-2xl bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
        <div className="flex justify-center">
          <div className="container mx-auto px-4 py-8 flex justify-center">
            <article
              className="max-w-2xl bg-white shadow-lg rounded-lg p-6 text-center"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{
                  width: "200px",
                  height: "250px",
                  display: "block",
                  margin: "0 auto",
                  borderRadius: "8px", // Optional: Add rounded corners
                  objectFit: "cover",
                }}
              />

              <p className="text-lg font-semibold text-gray-700 mt-4">
                ${product.price}
              </p>
              <p className="text-gray-600 mt-2">{product.description}</p>

              <div className="mt-6">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  onClick={() => addItemToCart(product.id)}
                >
                  Add to Cart
                </button>
              </div>
            </article>
          </div>
        </div>
      </article>
    </div>
  );
}
