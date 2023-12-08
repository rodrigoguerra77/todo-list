import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    login_success: (state, action) => {
      const { user } = action.payload;
      window.localStorage.setItem('token', user.token);
      state.isLoggedIn = true;
      state.user = user;
    },
    logout: state => {
      window.localStorage.removeItem('token');
      state.isLoggedIn = false;
      state.user = null;
    },
    get_authentication: (state, action) => {
      const { user } = action.payload;

      state.isLoggedIn = true;
      state.user = user;
    },
  },
});
export const { login_success, logout, get_authentication } = authSlice.actions;
/* --- */
export default authSlice.reducer;
/* --- */

// export const loginUser = loginData => dispatch => {
//   window.localStorage.setItem('token', loginData.accessToken);
//   window.localStorage.setItem('refreshToken', loginData.refreshToken);

//   dispatch(
//     login_success({
//       ...loginData,
//       user: {
//         ...loginData.user,
//       },
//     })
//   );
// };

// export const logoutUser = () => dispatch => {
//   localStorage.removeItem('token');
//   localStorage.removeItem('refreshToken');
//   localStorage.clear();
//   /* window.location.reload() */
//   dispatch(logout());
// };

// export const me = userData => dispatch => {
//   const result = {
//     user: {
//       ...userData.user,
//     },
//   };

//   dispatch(get_authentication(result));
// };
