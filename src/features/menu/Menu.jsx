// Importing necessary dependencies
import { useLoaderData } from 'react-router-dom'; // Importing useLoaderData hook from react-router-dom
import { getMenu } from '../../services/apiRestaurant'; // Importing getMenu function from apiRestaurant service
import MenuItem from './MenuItem'; // Importing MenuItem component

// Menu component definition
function Menu() {
  // Retrieving menu data using useLoaderData hook
  const menu = useLoaderData();

  // Rendering the menu items
  return (
    <ul className="divide-y divide-stone-200 px-2"> 
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

// Loader function used for server-side data fetching
export async function loader() {
  // Fetching menu data asynchronously using getMenu function
  const menu = await getMenu();
  return menu; // Returning the fetched menu data
}

export default Menu; // Exporting the Menu component as default

