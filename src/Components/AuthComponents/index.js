import React from "react";
import { View, Text, Switch } from "react-native";
import { useStyle } from "../../../services/StyleContext";
import Globalstyles from "../../GlobalStyles";
import styles from "./style";

const Top = () => {
    const { isDarkMode, toggleDarkMode } = useStyle();
    return(
        <View style={Globalstyles.line}>
        <View style={{width:"100%", height:50}}></View>
             <Switch
                     value={isDarkMode}
                     onValueChange={toggleDarkMode}
                     thumbColor={isDarkMode ? '#f4f3f4' : '#f4f3f4'}
                     trackColor={{ false: '#767577', true: '#81b0ff' }}
                     style={styles.switch}
                 />   
       </View>
    );
}

export default Top;