import { useContext } from 'react';

import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartItem from './CartItem';

const Cart = ({ onClose }) => {
  const cartContext = useContext(CartContext);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartContext.addItem({...item, amount: 1});
  };

  const cartItemRemoveHandler = (item) => {
    cartContext.removeItem({...item, amount: 1});
  };

  const cartItems = cartContext.items.map((cartItem) => {
    return <CartItem
      key={cartItem.id}
      name={cartItem.name}
      amount={cartItem.amount}
      price={cartItem.price}
      onAdd={cartItemAddHandler.bind(null, cartItem)}
      onRemove={cartItemRemoveHandler.bind(null, cartItem)}
    />
  });

  return (
    <Modal onClose={onClose}>
      <ul className={styles['cart-items']}>
        {cartItems}
      </ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles['button__alt']} onClick={onClose}>Close</button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
