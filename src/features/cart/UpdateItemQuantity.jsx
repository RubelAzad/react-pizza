// Importing necessary dependencies
import { useDispatch } from 'react-redux'; // Importing useDispatch hook from react-redux
import Button from '../../ui/Button'; // Importing Button component from ui directory
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice'; // Importing decreaseItemQuantity and increaseItemQuantity action creators from cartSlice file in current directory

// UpdateItemQuantity component definition
function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch(); // Initializing dispatch function from react-redux

  // Rendering UpdateItemQuantity component
  return (
    <div className="flex items-center gap-2 md:gap-3"> {/* Container for buttons and current quantity */}
      {/* Button to decrease item quantity */}
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      {/* Displaying current quantity */}
      <span className="text-sm font-medium">{currentQuantity}</span>
      {/* Button to increase item quantity */}
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        + 
      </Button>
    </div>
  );
}

export default UpdateItemQuantity; // Exporting the UpdateItemQuantity component as default
