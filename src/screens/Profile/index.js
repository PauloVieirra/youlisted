import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ProfilePage(){
    return(
        <View style={styles.container}>
            <Text>Profile Page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:"100%",
        height:"100%",
        justifyContent:"center",
        alignItems:'center'
    }

})