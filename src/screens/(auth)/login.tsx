import { useForm, Controller, FormState } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import globalStyles from "@/src/styles/global";
import theme from "@/src/styles/theme";
import { NavigationProp } from "@react-navigation/native";
import React, { useState } from "react";
import typography from "@/src/styles/typography";
import formStyles from "@/src/styles/formStyles";

import { useLoginMutation } from "@/src/integrations/features/apis/apiSlice";
import { loginUser } from "@/src/integrations/features/user/usersSlice";
// import { useDispatch, useSelector } from "react-redux"
import {useAppDispatch, useAppSelector} from "@/src/integrations/hooks"
import { useEffect } from "react";


export default function LoginScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
  }) {
  
  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<FormData>();
const initialState = {
      phone_number: "", password: ""
}
const [formstate, setFormstate] = useState(initialState);
const { phone_number, password } = formstate;

const onChange = (key:string,value:string) => {
  setFormstate({ ...formstate, [key]: value })
}


const  onSubmit = async ()=>{

  const data = {
      phone_number: formstate.phone_number,
      password: formstate.password
  }
  console.log(data)
  let res = await login(data)
  if (res.data){
    dispatch(loginUser({
      ...res.data.user,
      'usertoken': res.data.token,
      logedin: true, save: true
    })) 
    // setuserlogged(true)
    navigation.navigate("Dashboard");
  }else{
    Alert.alert("Please fill all fields");
  }

}


const [login, { isLoading }] = useLoginMutation()

const dispatch = useAppDispatch();
const user = useAppSelector(state => state.user)

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <Image
          source={require("@/assets/purpleLogoIcon.png")}
          style={globalStyles.logoRect}
        />

        <Text
          style={[
            typography.text2XL_SemiBold,
            {
              textAlign: "center",
              marginBottom: 8,
            },
          ]}
        >
          Welcome back!
        </Text>
        <Text
          style={[
            typography.textBase_Regular,
            {
              textAlign: "center",
              marginBottom: 24,
            },
          ]}
        >
          Sign in to continue.
        </Text>

        {/* Phone Number Input */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Phone Number</Text>
          <View style={formStyles.inputCntr}>
            <SimpleLineIcons
              name="phone"
              size={20}
              color={theme.colors["neutral-700"]}
            />
            
                <TextInput
                  style={formStyles.inputText}
                  placeholder="+2348523180"
                  placeholderTextColor={theme.colors["disabled-text"]}
                  keyboardType="numeric"
                  onChangeText={(text) => onChange('phone_number', text)}
                  value={phone_number}
              
                />
             
          </View>
        </View>

        {/* Password Input */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Password</Text>
          <View style={formStyles.inputCntr}>
            <Feather
              name="lock"
              size={20}
              color={theme.colors["neutral-700"]}
            />
            
                <TextInput
                  style={formStyles.inputText}
                  placeholder="********"
                  placeholderTextColor={theme.colors["disabled-text"]}
                  secureTextEntry
                  onChangeText={(text) => onChange('password', text)}
                  value={password}
                />
              
          </View>
        </View>

        {/* Forgot password */}
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPassword")}
          style={{ alignSelf: "flex-end" }}
        >
          <Text style={{ color: theme.colors["purple-700"], fontSize: 14 }}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          onPress={onSubmit}
          style={[
            formStyles.submitButton,
            {
              marginTop: 40,
            },
          ]}
        >
          <Text style={[formStyles.submitText]}>Login</Text>
        </TouchableOpacity>

        {/* Don't have an account */}
        <View style={formStyles.infoGroup}>
          <Text style={formStyles.infoText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={formStyles.infoLink}>Sign up.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
