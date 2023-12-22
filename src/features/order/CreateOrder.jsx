import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/CartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../Store";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const dispatch = useDispatch();
  const [withPriority, setWithPriority] = useState(false);
  const {
    userName,
    status: addressStatus,
    address,
    position,
    error: errorAddress,
  } = useSelector((store) => store.user);
  const isLoadingAddress = addressStatus === "loading";

  const navigate = useNavigation();
  const isSubmitting = navigate.state === "submitting";

  const errors = useActionData();

  const cart = useSelector(getCart);
  const totalPriceInCart = useSelector(getTotalCartPrice);

  const priorityPrice = withPriority ? totalPriceInCart * 0.2 : 0;

  const totalPayablePrice = totalPriceInCart + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            defaultValue={userName}
            type="text"
            name="customer"
            required
            className="inputs grow"
          />
        </div>

        <div
          className={`mb-5 flex flex-col gap-2 sm:flex-row ${
            errors ? "sm:items-start" : "sm:items-center"
          }`}
        >
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="inputs w-full" />
            {errors && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-sm text-red-700">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div
          className={`relative mb-5 flex flex-col gap-2 sm:flex-row ${
            addressStatus === "error" ? "sm:items-start" : "sm:items-center"
          }`}
        >
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="inputs w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-sm text-red-700">
                {errorAddress}
              </p>
            )}
          </div>

          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[35px] z-50 md:right-[5px] md:top-[5px] ">
              <Button
                disabled={isLoadingAddress}
                type="small"
                onclick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                get location
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting || isLoadingAddress
              ? "placing order..."
              : `Order now from ${totalPayablePrice}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
