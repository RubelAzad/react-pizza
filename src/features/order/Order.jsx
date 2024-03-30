// Importing necessary dependencies
import { useFetcher, useLoaderData } from 'react-router-dom'; // Importing useFetcher and useLoaderData hooks from react-router-dom
import OrderItem from './OrderItem'; // Importing OrderItem component from current directory
import { getOrder } from '../../services/apiRestaurant'; // Importing getOrder function from apiRestaurant service
import { calcMinutesLeft, formatCurrency, formatDate } from '../../utils/helpers'; // Importing calcMinutesLeft, formatCurrency, and formatDate functions from utils/helpers
import { useEffect } from 'react'; // Importing useEffect hook from React
import UpdateOrder from './UpdateOrder'; // Importing UpdateOrder component from current directory

// Order component definition
function Order() {
  const order = useLoaderData(); // Retrieving order data using useLoaderData hook
  const fetcher = useFetcher(); // Initializing fetcher hook

  // useEffect hook to load menu data if not already loaded
  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
    },
    [fetcher]
  );

  // Destructuring order data
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  // Calculating time left for delivery
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  // Rendering Order component
  return (
    <div className="space-y-8 px-4 py-6">
      {/* Order status section */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        {/* Status badges */}
        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      {/* Estimated delivery section */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      {/* Order items section */}
      <ul className="dive-stone-200 divide-y border-b border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId)
                ?.ingredients ?? []
            }
          />
        ))}
      </ul>

      {/* Price summary section */}
      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {/* Update order section */}
      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

// Loader function to fetch order data
export async function loader({ params }) {
  const order = await getOrder(params.orderId); // Fetching order data using getOrder function
  return order; // Returning fetched order data
}


export default Order;
