import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./CartSlice";

function Cart() {
  const { userName } = useSelector((store) => store.user);
  const { cart } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  if (cart.length < 1)
    return (
      <div className="px-4 py-3">
        <LinkButton to="/menu">&larr; Back to menu</LinkButton>

        <h2 className="mt-7 text-xl font-semibold capitalize">
          Your cart is empty
        </h2>
      </div>
    );

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold capitalize">
        Your cart, {userName}
      </h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b border-b-stone-200">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-7 space-x-2">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        <Button type="secondary" onclick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
