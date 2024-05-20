import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInPage from "../src/screens/SignIn";
import SignUpPage from "../src/screens/SignUp";

const AuthStack = createNativeStackNavigator();

function AuthRoutes() {

    return (
        <AuthStack.Navigator>
            <AuthStack.Screen 
                name="SignIn" 
                component={SignInPage}
                options={{
                    headerShown: false,
                }}
            />
            <AuthStack.Screen 
                name="SignUp" 
                component={SignUpPage}
                options={{
                    headerShown: false,
                }}
            />
            
         </AuthStack.Navigator>
    );
}

export default AuthRoutes;
