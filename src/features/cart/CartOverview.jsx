// Importing necessary dependencies
import { useSelector } from 'react-redux'; // Importing useSelector hook from react-redux
import { Link } from 'react-router-dom'; // Importing Link component from react-router-dom
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice'; // Importing getTotalCartPrice and getTotalCartQuantity functions from cartSlice file in current directory
import { formatCurrency } from '../../utils/helpers'; // Importing formatCurrency function from helpers directory

// CartOverview component definition
function CartOverview() {
  // Selecting total cart quantity from store
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  // Selecting total cart price from store
  const totalCartPrice = useSelector(getTotalCartPrice);

  // If total cart quantity is 0, return null (don't render anything)
  if (!totalCartQuantity) return null;

  // Rendering CartOverview component

  return (
    <div className="flex items-center justify-between bg-emerald-500 px-4 py-4 text-sm uppercase text-stone-300 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
