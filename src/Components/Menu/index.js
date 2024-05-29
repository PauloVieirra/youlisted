import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomMenuBar = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigateToScreen('List')} style={styles.button}>
        <Text style={styles.buttonText}>Ranking</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Home')} style={styles.button}>
        <Text style={styles.buttonText}>Lista</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Game')} style={styles.button}>
        <Text style={styles.buttonText}>Jogo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Events')} style={styles.button}>
        <Text style={styles.buttonText}>Eventos</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Profille')} style={styles.button}>
        <Text style={styles.buttonText}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
});

export default BottomMenuBar;
