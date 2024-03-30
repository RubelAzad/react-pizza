// Importing necessary dependencies
import { useSelector } from 'react-redux'; // Importing useSelector hook from react-redux
import { formatCurrency } from '../../utils/helpers'; // Importing formatCurrency function from helpers directory
import DeleteItem from './DeleteItem'; // Importing DeleteItem component from current directory
import UpdateItemQuantity from './UpdateItemQuantity'; // Importing UpdateItemQuantity component from current directory
import { getCurrentQuantityById } from './cartSlice'; // Importing getCurrentQuantityById function from cartSlice file in current directory

// CartItem component definition
function CartItem({ item }) {
  // Destructuring item object
  const { pizzaId, name, quantity, totalPrice } = item;

  // Selecting current quantity of pizza in cart
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  // Rendering CartItem component

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0 ">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>

        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
