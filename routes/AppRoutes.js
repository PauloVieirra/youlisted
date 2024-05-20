import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "../src/screens/Home";
import ListPage from "../src/screens/List";
import ProfilePage from "../src/screens/Profile";
import EventsPage from "../src/screens/Events";

const AuthStack = createNativeStackNavigator();

function AuthRoutes() {

    return (
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
    );
}

export default AuthRoutes;
