import React, { useLayoutEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../ReduxStorage/slices/RegistrationSlice";
const RegistrationPage = () => {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const loggedUser = useSelector((state) => state.loggedUser.loggedUser);

  const handleRedirection = () => {
    if (loggedUser.name !== undefined) {
      navigate("/search");
    }
  };

  useLayoutEffect(() => {
    return handleRedirection;
  }, []);

  const handleChange = (event) => {
    setFormState((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const RegisterUserApi = async () => {
    const response = await axios.post("http://localhost:3001/api/contacts", {
      ...formState,
    });
    const responseJson = response.data;
    const payload = {
      id: responseJson.data._id,
      email: responseJson.data.email,
      cometChatId: responseJson.data.cometChatId,
      phone: responseJson.data.phone,
      name: responseJson.data.name,
    };

    dispatch(addUser(payload));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    RegisterUserApi(formState);
    setFormState({
      name: "",
      phone: "",
      email: "",
    });
  };

  return (
    <div className="container">
      <div>
        <h2>Registration Page</h2>
      </div>
      <form className="" onSubmit={handleSubmit}>
        <div className="formContainer">
          <div>
            <input
              type="text"
              placeholder="Enter name"
              name="name"
              className="inputStyle"
              value={formState.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="phone"
              className="inputStyle"
              placeholder="Enter phone number"
              value={formState.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              className="inputStyle"
              placeholder="Enter email address"
              value={formState.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <button className="buttonStyle" type="submit">
              {" "}
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
