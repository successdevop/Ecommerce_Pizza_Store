import Button from "../../ui/Button";
import { formatCurrency } from "../../utilities/helpers";
import PropTypes from "prop-types";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-12">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <Button type="small">Delete</Button>
      </div>
    </li>
  );
}

CartItem.propTypes = {
  item: PropTypes.object,
};
export default CartItem;
