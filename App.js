import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { StyleProvider } from "./services/StyleContext";
import { GameProvider } from "./services/Context";
import AuthContext from "./services/AuthContext";
import Routes from "./routes/index";

export default function App() {
  return(
<NavigationContainer>
   
     <GameProvider>
      
       <StyleProvider>
         <Routes/>
       </StyleProvider>
     
     </GameProvider>
  
 </NavigationContainer>
  );
}