import { useState } from 'react'; // Importing useState hook from React
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom'; // Importing necessary components and hooks from react-router-dom
import { createOrder } from '../../services/apiRestaurant'; // Importing createOrder function from apiRestaurant service
import Button from '../../ui/Button'; // Importing Button component from current directory
import EmptyCart from '../cart/EmptyCart'; // Importing EmptyCart component from cart directory
import { useDispatch, useSelector } from 'react-redux'; // Importing useDispatch and useSelector hooks from react-redux
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice'; // Importing necessary functions from cartSlice
import store from '../../store'; // Importing store from current directory
import { formatCurrency } from '../../utils/helpers'; // Importing formatCurrency function from utils/helpers
import { fetchAddress } from '../user/userSlice'; // Importing fetchAddress function from userSlice

// Regular expression to validate phone numbers
// Source: https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

// CreateOrder component definition
function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false); // State to manage priority option
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user); // Getting user data from Redux store
  const isLoadingAddress = addressStatus === 'loading'; // Checking if address is loading

  const navigation = useNavigation(); // Navigation hook
  const isSubmitting = navigation.state === 'submitting'; // Checking if form is submitting

  const formErrors = useActionData(); // Fetching form errors from action data
  const dispatch = useDispatch(); // Dispatch hook

  const cart = useSelector(getCart); // Getting cart data from Redux store
  const totalCartPrice = useSelector(getTotalCartPrice); // Getting total cart price from Redux store
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0; // Calculating priority price
  const totalPrice = totalCartPrice + priorityPrice; // Calculating total price

  // If cart is empty, display EmptyCart component
  if (!cart.length) return <EmptyCart />;

  // Rendering CreateOrder component
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* Order form */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {/* Displaying phone number error if exists */}
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {/* Displaying address error if exists */}
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>

          {/* Button to fetch address */}
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          {/* Checkbox for priority option */}
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to give your order priority?
          </label>
        </div>

        <div>
          {/* Hidden inputs for cart and position */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />

          {/* Button to place order */}
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? 'Placing order....'
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// Action function to handle form submission
export async function action({ request }) {
  const formData = await request.formData(); // Getting form data
  const data = Object.fromEntries(formData); // Converting form data to object

  // Creating order object
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  console.log(order); // Logging order object to console

  const errors = {}; // Initializing errors object

  // Validating phone number
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.';

  // If errors exist, return errors
  if (Object.keys(errors).length > 0) return errors;

  // If everything is okay, create new order and redirect
  const newOrder = await createOrder(order); // Creating new order using createOrder function

  // Do NOT overuse
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
