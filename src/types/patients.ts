import { ImageSourcePropType } from "react-native";

export interface PatientProps {
  id: string;
  name: string;
  number: string;
  image: ImageSourcePropType | undefined;
  date: string;
}
