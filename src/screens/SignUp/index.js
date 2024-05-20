import React,{useState} from "react";
import { View, Text, Switch, TouchableOpacity} from "react-native";
import { useStyle } from "../../../services/StyleContext";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import Globalstyles from "../../GlobalStyles";

export default function SignUpPage(){
    const { isDarkMode, toggleDarkMode } = useStyle();
    const navigation = useNavigation();

    const handleGo = () => {
        navigation.navigate('SignIn')
    }
    return(
        <View style={[styles.container, isDarkMode && Globalstyles.container]}>
             <View style={Globalstyles.line}>
                        <Switch
                            value={isDarkMode}
                            onValueChange={toggleDarkMode}
                            thumbColor={isDarkMode ? '#f4f3f4' : '#f4f3f4'}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            style={styles.switch}
                        />
                    </View>
            <TouchableOpacity onPress={handleGo}>
            <Text>SignUp Page</Text>
            </TouchableOpacity>        
            
        </View>
    );
}



