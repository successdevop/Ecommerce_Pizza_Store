import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utilities/helpers";
import PropTypes from "prop-types";
import { getCart, removeItemFromCart } from "./CartSlice";
import UpdateCartItemQuantities from "./UpdateCartItemQuantities";

function CartItem({ item }) {
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  const { pizzaId, name, quantity, totalPrice } = item;

  const handleDeleteItemFromCart = () => {
    // const item = cart.find((item) => item.pizzaId === pizzaId);
    dispatch(removeItemFromCart(pizzaId));
  };

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-12">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateCartItemQuantities pizzaId={pizzaId} />
        <Button onclick={handleDeleteItemFromCart} type="small">
          Delete
        </Button>
      </div>
    </li>
  );
}

CartItem.propTypes = {
  item: PropTypes.object,
};
export default CartItem;
