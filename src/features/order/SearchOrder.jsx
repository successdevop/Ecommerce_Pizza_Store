import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    navigate(`/order/${searchQuery}`);
    setSearchQuery("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order by no"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <input
        type="submit"
        name=""
        id=""
        value={"Search"}
        style={{ cursor: "pointer" }}
      />
    </form>
  );
}

export default SearchOrder;
