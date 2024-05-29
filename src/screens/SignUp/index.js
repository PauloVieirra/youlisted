import React, { useState, useContext } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from "react-native";
import { useStyle } from "../../../services/StyleContext";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';

import Top from "../../Components/AuthComponents";
import styles from "./style";
import Globalstyles from "../../GlobalStyles";

export default function SignUpPage() {
  const { isDarkMode, toggleDarkMode } = useStyle();
  const navigation = useNavigation();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageUri, setImageUri] = useState(null); 
  console.log(imageUri);

  const handleGo = () => {
    navigation.navigate("SignIn");
  };

  const handleImageSelection = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permissão negada para acessar a biblioteca de mídia.');
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled) {
        setImageUri(result.uri);
      }
    } catch (error) {
      console.error('Erro ao selecionar a imagem:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={{height: 200, alignItems: 'center', justifyContent: 'center'}}>
        {imageUri ? ( // Renderiza a imagem se um URI estiver disponível
          <Image source={{ uri: imageUri }} style={{ width: 150, height: 150, resizeMode: 'cover', borderRadius: 75 }} />
        ) : (
          <Text>Imagem</Text>
        )}
        <TouchableOpacity onPress={handleImageSelection}>
          <Text>Selecionar Imagem</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{flex: 1, height: '100%'}}>
        <View style={styles.cont_bottom}>
          <View style={styles.cont_input}>
            <TextInput
              placeholder="Nome"
              style={styles.input}
              value={nome}
              onChangeText={setNome}
            />
          </View>
          <View style={styles.cont_input}>
            <TextInput
              placeholder="E-mail"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.cont_input}>
            <TextInput
              placeholder="Senha"
              style={styles.input}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.cont_input}>
            <TextInput
              placeholder="Confirmar Senha"
              style={styles.input}
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.cont_base}>
        <TouchableOpacity style={styles.primaty_btn}>
          <Text style={styles.text_login}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
