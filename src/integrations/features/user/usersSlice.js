import { readFromAsyncStorage, writeToAsyncStorage } from '../../async_store';
import { createSlice } from '@reduxjs/toolkit';

const initialData = {
    id:0,first_name:"",last_name:"",
    email: "", user_type: "", phone_number: '',
    specalization: '', verified_number: false,
    verified_email: false,usertoken:"",
    logedin: false,
}


let userData = readFromAsyncStorage("user")
if (!userData) {
    writeToAsyncStorage("user", initialData)
    userData = initialData
}

const initialState = {
  id: userData.id, first_name:userData.first_name,
  last_name:userData.last_name,
  email:userData.email, user_type:userData.user_type,
  phone_number: userData.phone_number,
  specalization: userData.specalization,
  verified_number: userData.verified_number,
  verified_email: userData.verified_email,
  usertoken:userData.usertoken,
  logedin: userData.logedin,
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    loginUser: (state,action) => {
        for (const key in action.payload) {
           state[key] = action.payload[key]
      }
      console.log('login')
      console.log(action.payload)
        writeToAsyncStorage("user", action.payload)
    },
    logoutUser: (state)=>{
      for (const key in state) {
        state[key] = initialData[key]
        }
        writeToAsyncStorage("user", initialData)
    }
  },
 
});

// export const getuser = (state)=>state
// export const getuserToken = (state)=>state.token
export const { loginUser,logoutUser} = userSlice.actions;

export default userSlice.reducer;
