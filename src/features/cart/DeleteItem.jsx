// Importing necessary dependencies
import { useDispatch } from 'react-redux'; // Importing useDispatch hook from react-redux
import Button from '../../ui/Button'; // Importing Button component from ui directory
import { deleteItem } from './cartSlice'; // Importing deleteItem action creator from cartSlice file in current directory

// DeleteItem component definition
function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch(); // Initializing dispatch function from react-redux

  // Rendering DeleteItem component
  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete 
    </Button>
  );
}

export default DeleteItem; // Exporting the DeleteItem component as default
