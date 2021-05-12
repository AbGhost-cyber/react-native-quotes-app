import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

//user stuff
export type User = {
  name: string;
};

//type of initial state
export type UserListState = {
  users: User[];
  loading: boolean;
  error: boolean;
  value: number;
};
//dispatch increment function
// const increment: CaseReducer<UserListState, PayloadAction<User>> = (
//   state,
//   action
// ) => {
//   let userList = state.users.concat(action.payload);
//   const updatedState: UserListState = {
//     users: userList,
//     error: state.error,
//     loading: state.loading,
//   };
//   return updatedState;
// };

const initialState: UserListState = {
  users: [],
  loading: false,
  error: false,
  value: 0,
};

const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrease: (state) => {
      if (state.value > 0) {
        state.value -= 1;
      }
    },
    clear: (state) => {
      state.value = 0;
    },
  },
});

export const { increment, decrease, clear } = userListSlice.actions;

export default userListSlice.reducer;
