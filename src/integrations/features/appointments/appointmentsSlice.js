import { createSlice } from '@reduxjs/toolkit';
import { readFromAsyncStorage, writeToAsyncStorage } from '../../async_store';
     
// medical_practitioner
const initialData = {
  data: [{
        patient: 0,
        condition: '',
        symptoms: '',
        notes: '',
        document: '',
        date: '',
        time: '',
        mode: '',
        medical_practitioner: 0,
}]}


export const get_initial_appointments_data = async () => {
    let data = await readFromAsyncStorage("appointments")
    let userData = initialData
    if (!data) {
      writeToAsyncStorage("appointments", initialData)
      // userData = initialData
    } else {
      userData = data 
    }
    return userData
  } 
  

export const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState:initialData,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addAppointments: (state, action) => {
      let save = action.payload.save
      delete action.payload.save
      state.data = action.payload.data
      save ? writeToAsyncStorage("appointments", action.payload):null
        
      },
    addSingleAppointment: (state, action) => {
        state.data = [...state.data, action.payload]
        writeToAsyncStorage("appointments", {data:state.data})
    },
    clearAppointments :state=>{
      state = initialData
      writeToAsyncStorage("appointments", initialData)
    }
   
  },
 
});

// export const getuserToken = (state)=>state.token
export const { addAppointments,clearAppointments,addSingleAppointment} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
