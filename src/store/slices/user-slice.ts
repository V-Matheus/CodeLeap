import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: User | null = {
  id: '',
  username: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      if (state) {
        state.id = action.payload.id;
        state.username = action.payload.username;
      } else {
        return action.payload;
      }
    },
    resetUserState: () => {
      return initialState;
    },
  },
});

export const { setUser, resetUserState } = userSlice.actions;
export default userSlice.reducer;
