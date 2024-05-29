import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import HomePage from "../src/screens/Home";
import ListPage from "../src/screens/List";
import ProfilePage from "../src/screens/Profile";
import EventsPage from "../src/screens/Events";
import GamePage from "../src/screens/Game";
import BottomMenuBar from "../src/Components/Menu";


const AuthStack = createNativeStackNavigator();

function AuthRoutes() {

    return (
        <View style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 100, bottom: 0, left: 0, backgroundColor: "#fff",}}>
     
        <AuthStack.Navigator>
            <AuthStack.Screen 
                name="Home" 
                component={HomePage}
                options={{
                    headerShown: false,
                }}
            />
            <AuthStack.Screen 
                name="List" 
                component={ListPage}
                options={{
                    headerShown: false,
                }}
            />
             <AuthStack.Screen 
                name="Game" 
                component={GamePage}
                options={{
                    headerShown: false,
                }}
            />
             <AuthStack.Screen 
                name="Profille" 
                component={ProfilePage}
                options={{
                    headerShown: false,
                }}
            />
            <AuthStack.Screen 
                name="Events" 
                component={EventsPage}
                options={{
                    headerShown: false,
                }}
            />

           
            
         </AuthStack.Navigator>
         <BottomMenuBar/>
         </View>
    );
}

export default AuthRoutes;
