import { Link, useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";

function Menu() {
  const menu = useLoaderData();

  return (
    <div>
      <h1>Menu</h1>
      <ul>
        {menu.map((pizza) => (
          <li key={pizza.id}>
            <Link>
              <img src={pizza.imageUrl} alt={pizza.name} />
              <h2>{pizza.name}</h2>
            </Link>
          </li>
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
