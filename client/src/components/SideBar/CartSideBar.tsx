import React from "react";
import styles from "../../styles/CartSideBar.module.scss";

interface CartSideBarProps {
  children: JSX.Element;
  isOpen: Boolean;
}

const CartSideBar: React.FC<CartSideBarProps> = ({ children, isOpen }) => {
  return (
    <div
      className={isOpen ? `${styles.cart} ${styles.open}` : `${styles.cart}`}
    >
      {children}
    </div>
  );
};
export default CartSideBar;
