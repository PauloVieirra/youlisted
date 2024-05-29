import React from "react";
import { View, Text, TouchableOpacity, TextInput, Switch, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useStyle } from "../../../services/StyleContext";
import { useNavigation } from "@react-navigation/native";
import Top from "../../Components/AuthComponents";
import Globalstyles from "../../GlobalStyles";
import styles from "./style";

export default function SignInPage(){
    const { isDarkMode, toggleDarkMode } = useStyle();
    const navigation = useNavigation();

    const handleGo = () => {
        navigation.navigate('SignUp')
    }

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            
                <View style={[styles.container, isDarkMode && Globalstyles.container]}>
                  <Top/>
                    <View style={styles.cont_top}>
                        <View style={styles.cont_input}>
                            <TextInput
                                placeholder="E-mail"
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.cont_input}>
                            <TextInput 
                                placeholder="Senha"
                                style={styles.input}
                                secureTextEntry={true}
                            />   
                        </View>
                    </View> 
                    <View style={Globalstyles.lineFree}>
                        <TouchableOpacity style={styles.primaty_btn}>
                            <Text style={styles.text_login}>SignIn</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.secundary_btn} onPress={handleGo}>
                            <Text style={[styles.text_signup, isDarkMode &&  Globalstyles.text_signup]}>Novo por aqui? Crie uma conta</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cont_bottom}>
                        <ScrollView style={styles.cont_options} keyboardShouldPersistTaps="always">
                            {/* Conteúdo adicional */}
                        </ScrollView>
                    </View>
                </View>
        
        </KeyboardAvoidingView>
    );
}
