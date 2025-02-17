import { get_initial_user_data, loginUser } from './features/user/usersSlice';
import  {
  get_initial_patient_data,
  addPatientAndMessage
} from './features/patient/patientAndMessageSlice'

const initializeStore = async (store) => {
  const user_data = await get_initial_user_data();
  store.dispatch(loginUser({ ...user_data, save: false }));
  const patient_and_message = await get_initial_patient_data()
  store.dispatch(addPatientAndMessage({ ...patient_and_message, save: false }))
    
};

export default initializeStore;