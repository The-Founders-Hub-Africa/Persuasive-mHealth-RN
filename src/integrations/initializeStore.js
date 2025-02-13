import userslice, { get_initial_user_data, loginUser } from './features/user/usersSlice';
  const initializeStore = async (store) => {
  const user_data = await get_initial_user_data();
  store.dispatch(loginUser({...user_data,save:false}));
};

export default initializeStore;