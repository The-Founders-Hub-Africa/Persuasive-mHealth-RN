import { createSlice } from '@reduxjs/toolkit';
import { readFromAsyncStorage, writeToAsyncStorage } from '../../async_store';

     
// medical_practitioner
const initialData = {
  data: [{
    id: 0,
    full_name: "",
    identifier: "",
    whatsapp_number: "",
    medical_practitioner: 0,
    image: undefined,
    address:'',
    date: '',
  }]}


export const get_initial_patients_data = async () => {
    let data = await readFromAsyncStorage("patients")
    let userData = initialData
    if (!data) {
      writeToAsyncStorage("patients", initialData)
      // userData = initialData
    } else {
      userData = data 
    }
    return userData
  } 
  

export const patientsSlice = createSlice({
  name: 'patients',
  initialState:initialData,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addPatients: (state, action) => {
      let save = action.payload.save
      delete action.payload.save
      state.data = action.payload.data
      save ? writeToAsyncStorage("patients", action.payload):null
        
    },

    clearPatients :state=>{
      state = initialData
      writeToAsyncStorage("patients", initialData)
    },
    
  },

 
});

// export const getPatientById = (patients, id) => states.find(patient => patient.id === id);
// export const getpatient = (patients,id)=>patients.filter(patient=>patient.id===id)
// export const getuserToken = (state)=>state.token
// export const getPatientById = (state)=console.log(state)
export const { addPatients,clearPatients} = patientsSlice.actions;

export default patientsSlice.reducer;
