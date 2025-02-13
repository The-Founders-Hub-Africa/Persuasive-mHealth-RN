import { readFromAsyncStorage, writeToAsyncStorage } from '../../async_store';
import { createSlice } from '@reduxjs/toolkit';

const initialData = {
    id:0,first_name:"",last_name:"",
    email: "", user_type: "", phone_number: '',
    specalization: '', verified_number: false,
    verified_email: false,usertoken:"",
    logedin: false,
}


export const get_initial_user_data = async () => {
  let data = await readFromAsyncStorage("user")
  if (!data) {
    writeToAsyncStorage("user", initialData)
    userData = initialData
  } else {
    userData = data 
  }
  return userData
} 


export const userSlice = createSlice({
  name: 'user',
  initialState: initialData,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    loginUser: (state, action) => {
      let save = action.payload.save
      delete action.payload.save
        for (const key in action.payload) {
           state[key] = action.payload[key]
      }
      save ? writeToAsyncStorage("user", action.payload):null
    },
    logoutUser: (state)=>{
      for (const key in state) {
        state[key] = initialData[key]
        }
        writeToAsyncStorage("user", initialData)
    }
  },
 
});

export const { loginUser,logoutUser} = userSlice.actions;

export default userSlice.reducer;
