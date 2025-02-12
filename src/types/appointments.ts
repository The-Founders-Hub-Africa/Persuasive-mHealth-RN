import { ImageSourcePropType } from "react-native";

export interface AppointmentProps {
  id: string;
  name: string;
  status: string;
  date: string;
  time: string;
  image: ImageSourcePropType | undefined;
}
