import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQtyInCart, increaseItemQtyInCart } from "./CartSlice";
import PropTypes from "prop-types";

function UpdateCartItemQuantities({ pizzaId, quantity }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button
        onclick={() => dispatch(decreaseItemQtyInCart(pizzaId))}
        type="round"
      >
        -
      </Button>
      <span className="p-1 text-sm">{quantity}</span>
      <Button
        onclick={() => dispatch(increaseItemQtyInCart(pizzaId))}
        type="round"
      >
        +
      </Button>
    </div>
  );
}

UpdateCartItemQuantities.propTypes = {
  quantity: PropTypes.number,
  pizzaId: PropTypes.number,
};
export default UpdateCartItemQuantities;
