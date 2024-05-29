import React, {useContext} from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useGameContext } from '../../../services/Context';
import Lista from '../../../data/Lista';

const HomePage = () => {
    const placar = { scoreA, scoreB } = useGameContext(useContext);
  return (
    <ScrollView>
   <Lista/>
   <Text> Placar:{placar.scoreA}</Text>
   </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default HomePage;
