import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../ReduxStorage/slices/RegistrationSlice";

function Login() {
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  const dispatch = useDispatch();

  const LoginUserApi = async () => {
    const response = await axios.get(
      `http://localhost:3001/api/contacts/${search}`
    );

    const payload = {
      id: response.data._id,
      email: response.data.email,
      cometChatId: response.data.cometChatId,
      phone: response.data.phone,
      name: response.data.name,
    };

    dispatch(addUser(payload));
  };
  return (
    <div className="searchContainer">
      <h2> Login By User ID </h2>

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
          <button className="searchBtn" onClick={LoginUserApi}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
