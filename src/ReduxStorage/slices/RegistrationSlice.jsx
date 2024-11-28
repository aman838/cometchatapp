import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedUser: {},
};

export const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const loggedUser = {
        id: action.payload?.id || "",
        name: action.payload.name,
        phone: action.payload.phone,
        email: action.payload.email,
        cometChatId: action.payload?.cometChatId || "",
      };
      state.loggedUser = loggedUser;
    },
  },
});

export const { addUser } = loggedUserSlice.actions;

export default loggedUserSlice.reducer;
