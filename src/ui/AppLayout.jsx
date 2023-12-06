import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import LoadingSpinner from "./LoadingSpinner";

function AppLayout() {
  const navigation = useNavigation();
  console.log(navigation);
  const isLoading = navigation.state === "loading";

  return (
    <div className="layout">
      <Header />
      <main>{isLoading ? <LoadingSpinner /> : <Outlet />}</main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
