"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useContext,
} from "react";
import { createPortal } from "react-dom";
import Cart from "./cart";
import { CartContext } from "../store/shopping-cart-context"; // Import Cart Context

const CartModal = forwardRef(function Modal({ title }, ref) {
  const dialog = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const cartCtx = useContext(CartContext) || { items: [] }; // Ensure cartCtx is always defined

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
      setTimeout(() => {
        if (dialog.current) dialog.current.showModal();
      }, 0);
    },
    close: () => {
      if (dialog.current) dialog.current.close();
      setIsOpen(false);
    },
  }));

  if (!isOpen) return null;

  async function handleCheckout() {
    try {
      if (!cartCtx.items.length) {
        console.warn("Cart is empty!");
        return;
      }

      const cartItems = cartCtx.items.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });

      if (!response.ok) throw new Error("Failed to create Stripe session");

      const { url } = await response.json();
      window.location.href = url; // Redirect to Stripe Checkout
    } catch (error) {
      console.error("Checkout Error:", error);
    }
  }

  return createPortal(
    <dialog ref={dialog} onCancel={() => ref.current.close()}>
      <h2>{title}</h2>
      <Cart />

      <button type="button" onClick={handleCheckout}>
        Checkout
      </button>

      <button type="button" onClick={() => ref.current.close()}>
        Close
      </button>
    </dialog>,
    document.body
  );
});

export default CartModal;
