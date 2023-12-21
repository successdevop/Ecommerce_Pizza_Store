import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function NotFound() {
  const error = useRouteError();

  return (
    <div className="mx-auto my-[20%] max-w-[80rem] px-4 text-center font-medium">
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <LinkButton to={"-1"}>&larr; Go back</LinkButton>
    </div>
  );
}

export default NotFound;
