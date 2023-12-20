import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQtyInCart, increaseItemQtyInCart } from "./CartSlice";
import PropTypes from "prop-types";

function UpdateCartItemQuantities({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button
        onclick={() => dispatch(decreaseItemQtyInCart(pizzaId))}
        type="round"
      >
        -
      </Button>
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
  pizzaId: PropTypes.string,
};
export default UpdateCartItemQuantities;
