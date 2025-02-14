"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Cart from "./cart";

const CartModal = forwardRef(function Modal({ title, actions }, ref) {
  const dialog = useRef();
  const [isOpen, setIsOpen] = useState(false); // ✅ Add state to control modal visibility

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
      setTimeout(() => dialog.current?.showModal(), 0); // Ensure it mounts before calling `showModal`
    },
    close: () => {
      setIsOpen(false);
      dialog.current?.close();
    },
  }));

  if (!isOpen) return null; // ✅ Prevent rendering when closed

  return createPortal(
    <dialog ref={dialog} onClose={() => setIsOpen(false)}>
      <h2>{title}</h2>
      <Cart />
      <form method="dialog" id="modal-actions">
        {actions}
        <button type="button" onClick={() => ref.current.close()}>
          Close
        </button>
      </form>
    </dialog>,
    document.body // ✅ Ensure modal is mounted correctly
  );
});

export default CartModal;
