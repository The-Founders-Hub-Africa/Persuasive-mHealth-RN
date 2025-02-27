import { ImageSourcePropType } from "react-native";

export interface PatientProps {
  id: number;
  full_name: string;
  whatsapp_number: string;
  identifier:string,
  image: ImageSourcePropType | undefined;
  date: string;
  medical_practitioner:number
}
