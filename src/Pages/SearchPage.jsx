import React, { useCallback, useState } from "react";
import { debounce } from "../utils/utils";
import { useSelector } from "react-redux";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.loggedUser.loggedUser);

  const handleSearchData = useCallback(
    debounce((value) => {
      setTimeout(() => {
        console.log("search data", value);
        Promise.resolve(value + "has searched");
      }, 1000);
    }, 400),
    []
  );

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
    handleSearchData(value);
  };

  return (
    <div className="searchContainer">
      <div className="heading">
        <h3>welcome {user.name}!</h3>
      </div>
      <h2> Search user to chat </h2>

      <div className="searchComponent">
        <div>
          <input
            type="text"
            className="inputStyle"
            onChange={handleSearch}
            placeholder="Search..."
            name="search"
            value={search}
          />
        </div>
        <div>
          <button className="searchBtn">Search</button>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
