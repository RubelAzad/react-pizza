// Importing necessary dependencies
import { useDispatch, useSelector } from 'react-redux'; // Importing useDispatch and useSelector hooks from react-redux
import Button from '../../ui/Button'; // Importing Button component
import DeleteItem from '../cart/DeleteItem'; // Importing DeleteItem component from cart directory
import UpdateItemQuantity from '../cart/UpdateItemQuantity'; // Importing UpdateItemQuantity component from cart directory
import { formatCurrency } from '../../utils/helpers'; // Importing formatCurrency function from helpers directory
import { addItem, getCurrentQuantityById } from '../cart/cartSlice'; // Importing addItem and getCurrentQuantityById functions from cartSlice

// MenuItem component definition
function MenuItem({ pizza }) {
  const dispatch = useDispatch(); // Initializing dispatch function from react-redux

  // Destructuring pizza object //imageUrl
  const { id, name, unitPrice, ingredients, soldOut} = pizza;

  // Selecting current quantity of pizza in cart
  const currentQuantity = useSelector(getCurrentQuantityById(id));

  // Checking if pizza is already in cart
  const isInCart = currentQuantity > 0;

  // Function to handle adding pizza to cart
  function handleAddToCart() {
    // Creating a new item object with pizza details
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    // Dispatching addItem action with the new item
    dispatch(addItem(newItem));
  }
 // Rendering MenuItem component
  return (
    <li className="flex gap-4 py-2">
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium text-emerald-400">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
