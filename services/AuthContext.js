import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "../servers/FirebaseConect";
import * as Location from 'expo-location';
import { useNavigation } from "expo-router";
import axios from "axios";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertcadastro, setAlertCadastro] = useState(false);
  const [alertNoPayments, setAlertNoPayments] = useState(false);
  const [userType, setUserType] =useState(false);
  const [lat, setLat] =useState("");
  const [lng, setLng] =useState("");
  

  
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const userData = await AsyncStorage.getItem("Auth_user");
        if (userData) {
          const currentUser = JSON.parse(userData);
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
      setLoading(false);
    };
  
    checkUserLoggedIn();
  
    const unsubscribe = firebase.auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Busca os detalhes do usuário no banco de dados em tempo real
          const userRef = firebase.database().ref(`users/${firebaseUser.uid}`);
          userRef.once("value", async (snapshot) => {
            const userData = snapshot.val();
            if (userData) {
              // Busca os detalhes adicionais no nó "complemento"
              const complementRef = firebase.database().ref(`complement/${firebaseUser.uid}`);
              complementRef.once("value", (complementSnapshot) => {
                const complementData = complementSnapshot.val();
                setUser({
                  ...userData,
                  complement: complementData // Adiciona os dados do complemento ao usuário
                });
                // Salva os dados do usuário incluindo os do complemento no AsyncStorage
                AsyncStorage.setItem(
                  "Auth_user",
                  JSON.stringify({
                    ...userData,
                    complement: complementData
                  })
                );
                if (!complementData || !complementData.cidade) {
                  // Forçar atualização se a cidade não estiver disponível
                  updateAddress();
                }
              });
            }
          });
        } catch (error) {
          console.error("Error retrieving user data:", error);
        }
      } else {
        setUser(null);
      }
    });
  
    // Cleanup function to unsubscribe from the listener
    return () => unsubscribe();
  }, []);
  

  const updateAddress = async () => {
    try {
      await getLocation();
    } catch (error) {
      console.error('Erro ao atualizar o endereço:', error);
    }
  };
  
  
  useEffect(() =>{
    getLocation();
  },[]);

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão de localização não concedida');
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setLat(latitude);
      setLng(longitude);
      const roundedLatitude = latitude.toFixed(6); // Arredonda para 6 casas decimais
      const roundedLongitude = longitude.toFixed(6); // Arredonda para 6 casas decimais
      setLocation({ latitude: roundedLatitude, longitude: roundedLongitude }); // Salvando as coordenadas arredondadas
      reverseGeocode(roundedLatitude, roundedLongitude);
    } catch (error) {
      console.error('Erro ao obter a localização:', error);
    }
  };
  
  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      setAddress(response.data.address);
      if (user) {
        const updatedUser = { ...user, complemento: { ...user.complemento, cidade: response.data.address.city } };
        setUser(updatedUser);
        AsyncStorage.setItem("Auth_user", JSON.stringify(updatedUser)); // Atualiza o AsyncStorage com a cidade
      }
      // Agora você pode calcular a distância de outro ponto usando as coordenadas arredondadas (latitude e longitude)
    } catch (error) {
      console.error('Erro ao converter coordenadas em endereço:', error);
    }
  };
  

  const signInWithEmailAndPassword = async (email, password) => {
    try {
       setLoading(true); 
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const { user } = userCredential;
      
      // Busca os detalhes do usuário no banco de dados em tempo real
      const userRef = firebase.database().ref(`users/${user.uid}`);
      userRef.once("value", (snapshot) => {
        const userData = snapshot.val();
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        AsyncStorage.setItem("Auth_user", JSON.stringify(updatedUser)); // Salva todos os detalhes do usuário
      });
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  const handleLoading = () => {
    setLoading(prevLoading => !prevLoading);
  };
  

  const signUpWithEmailAndPassword = async (
    email,
    password,
    tipo,
    nome
  ) => {
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (user) {
        setUser(user);
        await AsyncStorage.setItem("Auth_user", JSON.stringify(user));
        // Registra os detalhes do usuário no banco de dados em tempo real
        await firebase.database().ref(`users/${user.uid}`).set({
          email: user.email,
          uid: user.uid,
          tipo: tipo,
          nome: nome,
          // Defina o tipo do usuário no banco de dados
          // Adicione outros campos necessários, se houver
        });
        if (tipo === "ADM") {
          setUserType(true);
        }else{
          null
        }
      } else {
        console.error("Usuário não definido ao criar a conta");
      }
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  const signUpWithEmailAndPasswordAdm = async (
        nome,
        email,
        password,
        telefone,
        nomecomercial,
        cnpj,
        urlImage,
        isValidate,
        tipo,
        userRole
  ) => {
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      const user = userCredential.user;

      if (user) {
        // Registra os detalhes do usuário no banco de dados em tempo real
        await firebase.database().ref(`users/${user.uid}`).set({
          nome: nome,
          email: user.email,
          uid: user.uid,
          telefone:telefone,
          nomecomercial:nomecomercial,
          tipo: tipo,
          cnpj:cnpj,
          urlImage: urlImage,
          isValidate: isValidate,
          userRole:userRole
        });
       
      } else {
        console.error("Usuário não definido ao criar a conta");
      }
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await firebase.auth().signOut();
      setUser(null);
      await AsyncStorage.removeItem("Auth_user");
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplite = async (nome, cidade, bairro, telefone, complemento, imagePro,{locationUser}) => {
    
    try {
      // Verificar se o usuário está logado
      if (!user) {
        throw new Error("Precisa estar logado.");
      }
      setLoading(true);
      
      // Criar um objeto para armazenar os dados complementares
      const complementoData = {
        nome: nome || "",
        cidade: cidade || "",
        bairro: bairro || "",
        telefone: telefone || "",
        complemento: complemento || "",
        urlImage: imagePro || "", 
        locationUser: locationUser || null,
      };
      
  
      // Remover propriedades com valor null do objeto
      Object.keys(complementoData).forEach(key => {
        if (complementoData[key] === null) {
          delete complementoData[key];
        }
      });
  
      // Gravação dos dados do complemento do usuário no Realtime Database 
      await firebase
        .database()
        .ref(`users/${user.uid}/complemento`)
        .set(complementoData);
  
      // Atualizar isValidate para true no nó do usuário
      await firebase
        .database()
        .ref(`users/${user.uid}`)
        .update({ isValidate: true });
  
      // Atualizar isValidate no AsyncStorage
      await AsyncStorage.setItem('isValidate', 'true');
      
      // Atualizar os dados locais do usuário
      setUser(prevUser => ({
        ...prevUser,
        isValidate: true,
        complemento: complementoData,
      }));
      
      setLoading(false);
      
      // Exibir mensagem de sucesso
      Alert.alert("Sucesso", "Seu cadastro está pronto!");
      
      // Redirecionar para a tela de login
      setAlertCadastro(false);

      navigation.navigate("Home");

    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      Alert.alert("Erro", "Ocorreu um erro. Por favor, tente novamente.");
    }
  };

  const handleCompliteAdm = async (nome, estado,cidade, bairro, rua,numero, cep, imagePro, {locationUser}) => {
    try {
      // Verificar se o usuário está logado
      if (!user) {
        throw new Error("Precisa estar logado.");
      }
      setLoading(true);
      
      // Criar um objeto para armazenar os dados complementares
      const complementoData = {
        nome: nome.trim() || null,
        estado: estado.trim() || null,
        cidade: cidade.trim() || null,
        bairro: bairro.trim() || null,
        rua: rua.trim() || null,
        numero: numero.trim() || null,
        cep: cep.trim() || null,
        urlImage: imagePro || "",
        locationUser: locationUser || null,
      };
  
      // Remover propriedades com valor null do objeto
      Object.keys(complementoData).forEach(key => {
        if (complementoData[key] === null) {
          delete complementoData[key];
        }
      });
  
      // Gravação dos dados do complemento do usuário no Realtime Database 
      await firebase
        .database()
        .ref(`users/${user.uid}/complemento`)
        .set(complementoData);
  
      // Atualizar isValidate para true no nó do usuário
      await firebase
        .database()
        .ref(`users/${user.uid}`)
        .update({ isValidate: true });
  
      // Atualizar isValidate no AsyncStorage
      await AsyncStorage.setItem('isValidate', 'true');
      
      // Atualizar os dados locais do usuário
      setUser(prevUser => ({
        ...prevUser,
        isValidate: true,
        complemento: complementoData,
      }));
      
      setLoading(false);
      
      // Exibir mensagem de sucesso
      Alert.alert("Sucesso", "Seu cadastro está pronto!");
      
      // Redirecionar para a tela de login
      setAlertCadastro(false);
      navigation.navigate("HomeAdmPage");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      Alert.alert("Erro", "Ocorreu um erro. Por favor, tente novamente.");
    }
  };

  const handleNewStore = async (nome, estado, cidade, bairro, rua, numero, cep, {locationUser}) => {
    try {
      // Verificar se o usuário está logado
      if (!user) {
        throw new Error("Precisa estar logado.");
      }
      setLoading(true);
      
      // Criar um objeto para armazenar os dados da loja
      const lojaData = {
        nome: nome.trim() || null,
        estado: estado.trim() || null,
        cidade: cidade.trim() || null,
        bairro: bairro.trim() || null,
        rua: rua.trim() || null,
        numero: numero.trim() || null,
        cep: cep.trim() || null,
        produtos: {}, // Sub-nó para armazenar os produtos
        locationUser: locationUser || null
      };
  
      // Remover propriedades com valor null do objeto
      Object.keys(lojaData).forEach(key => {
        if (lojaData[key] === null) {
          delete lojaData[key];
        }
      });
  
      // Concatenar cidade e uid para definir o caminho da loja
      const storePath = `${user.complemento.cidade}/${user.uid}`;
      
      // Gravação dos dados da loja no Realtime Database 
      await firebase
        .database()
        .ref(`lojas/${storePath}`)
        .set(lojaData);
  
      // Atualizar a informação do usuário para indicar que ele possui uma loja cadastrada
      await firebase
        .database()
        .ref(`users/${user.uid}`)
        .update({ isStore: true });
  
      setLoading(false);
      
      // Exibir mensagem de sucesso
      Alert.alert("Sucesso", "Sua loja foi criada com sucesso!");
      
      // Redirecionar para a tela de home (ou onde quer que seja necessário)
      // navigation.navigate("Home");
    } catch (error) {
      console.error("Erro ao cadastrar a loja:", error);
      Alert.alert("Erro", "Ocorreu um erro ao criar a loja. Por favor, tente novamente.");
    }
  };
  
  
  const handleAlertCadastro = () => {
    if (!alertcadastro) {
      setAlertCadastro(true);
    } else {
      setAlertCadastro(false);
    }
  };

  const handleAlertNoPayment = () => {
    if (!alertNoPayments) {
      setAlertNoPayments(true);
    } else {
      setAlertNoPayments(false);
    }
  };

 
  
  

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        location,
        address,
        lat,
        lng,
        alertcadastro,
        handleLoading,
        handleAlertCadastro,
        alertNoPayments,
        handleAlertNoPayment,
        userType,
        handleNewStore,
        handleComplite,
        handleCompliteAdm,
        signInWithEmailAndPassword,
        signUpWithEmailAndPassword,
        signUpWithEmailAndPasswordAdm,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
