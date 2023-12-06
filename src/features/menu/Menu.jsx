import { getMenu } from "../../services/apiRestaurant";

function Menu() {
  return (
    <div>
      <h1>Menu</h1>
      <ul></ul>
    </div>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}
export default Menu;
