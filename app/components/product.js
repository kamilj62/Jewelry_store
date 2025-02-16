"use client";

import { useContext } from "react";
import Image from "next/image";

import { CartContext } from "../store/shopping-cart-context";
import Link from "next/link";

export default function Product({
  id,
  image,
  title,
  price,
  description,
  slug,
}) {
  const { addItemToCart } = useContext(CartContext);

  return (
    <article className="product">
      <Link href={`/jewelry/${slug}`} passHref>
        <div>
          <Image src={image} alt={title} width={250} height={250} />
        </div>
      </Link>

      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className="product-price">${price}</p>
          <p>{description}</p>
        </div>
        <p className="product-actions">
          <button onClick={() => addItemToCart(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
