import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { StyleProvider } from "./services/StyleContext";
import Routes from "./routes/index";

export default function App() {
  return(
    <NavigationContainer>
      <StyleProvider>
         <Routes/>
      </StyleProvider>
    </NavigationContainer>
  );
}