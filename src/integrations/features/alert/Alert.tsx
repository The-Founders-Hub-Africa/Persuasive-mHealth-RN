import { useAppDispatch, useAppSelector } from "@/src/integrations/hooks";
import { logoutUser } from "../user/usersSlice"
import { useEffect } from "react"
import Toast from 'react-native-toast-message';
import { clearAlert } from "./alertSlice";
import React from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";

const Alert_System = () => {

  const navigation = useNavigation<NavigationProp<any>>();

    const dispatch = useAppDispatch();
    const alert = useAppSelector(state => state.alert);
    
    useEffect(() => {
      if (alert.status_code > 0) {
        console.log(alert.status_code)
        if(alert.status_code === 401){
          dispatch(logoutUser())
          navigation.navigate('Login')
        }
        let type = alert.status_code === 200 ? 'success' : 'error'
        for (const message of alert.message) {
            Toast.show({
                type: type,
                text1: message
            });
        }
        dispatch(clearAlert())
      }
    }, [alert])
  
  return (
      <React.Fragment></React.Fragment>
  )
}

export default Alert_System

