import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();
  console.log(menu);
  return (
    <div>
      <h1>Menu</h1>
      <ul className=" divide-y-2 divide-stone-200 px-2">
        {menu.map((pizza) => (
          <MenuItem key={pizza.id} pizza={pizza} />
        ))}
      </ul>
    </div>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}
export default Menu;
