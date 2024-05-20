import React,{useState}  from "react";
import { ActivityIndicator, Text, View } from "react-native";
import AuthRoutes from "./AuthRoutes";
import AppRoutes from "./AppRoutes";
import AdmRoutes from "./AdmRoutes"; 



function Routes() {
  console.disableYellowBox = true;
  const [isLoading, setIsLoading] = useState(false);

  
  if (isLoading) {
    return <AppRoutes />;
  }
 
  return  <AuthRoutes />;
}

export default Routes;

