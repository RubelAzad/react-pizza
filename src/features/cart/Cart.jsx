// Importing necessary dependencies
import LinkButton from '../../ui/LinkButton'; // Importing LinkButton component from ui directory
import Button from '../../ui/Button'; // Importing Button component from ui directory
import CartItem from './CartItem'; // Importing CartItem component from current directory
import EmptyCart from './EmptyCart'; // Importing EmptyCart component from current directory
import { useDispatch, useSelector } from 'react-redux'; // Importing useDispatch and useSelector hooks from react-redux
import { clearCart, getCart } from './cartSlice'; // Importing clearCart and getCart functions from cartSlice file in current directory

// Cart component definition
function Cart() {
  // Selecting username from user state
  const username = useSelector((state) => state.user.username);
  // Selecting cart items using getCart selector
  const cart = useSelector(getCart);
  const dispatch = useDispatch(); // Initializing dispatch function from react-redux

  // If cart is empty, render EmptyCart component
  if (!cart.length) return <EmptyCart />;

  // Rendering Cart component

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold text-emerald-400">Your cart, {username}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>

        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
