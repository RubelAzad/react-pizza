import { useFetcher } from 'react-router-dom'; // Importing useFetcher hook from react-router-dom
import Button from '../../ui/Button'; // Importing Button component from current directory
import { updateOrder } from '../../services/apiRestaurant'; // Importing updateOrder function from apiRestaurant service

// UpdateOrder component definition
function UpdateOrder({ order }) {
  const fetcher = useFetcher(); // Using useFetcher hook

  // Rendering UpdateOrder component
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder; // Exporting UpdateOrder component

// Action function to handle updating order
export async function action({ request, params }) {
  const data = { priority: true }; // Setting priority to true
  await updateOrder(params.orderId, data); // Updating order priority using updateOrder function
  return null; // Returning null
}