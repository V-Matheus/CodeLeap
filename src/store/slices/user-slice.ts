import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    resetUserState: (state) => {
      state.user = initialState.user;
    },
  },
});

export const { setUser, resetUserState } = userSlice.actions;
export default userSlice.reducer;
