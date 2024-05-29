import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useGameContext } from '../../../services/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GamePage = () => {
  const { teamA, teamB, scoreA, scoreB, increaseScoreA, increaseScoreB,FinalyGame, clearGame } = useGameContext();

  const handleEndGame = () => {
    Alert.alert(
      'Encerrar partida',
      'Tem certeza de que deseja encerrar a partida?',
      [
        { text: 'Cancelar', onPress: () => console.log('Cancelado') },
        {
          text: 'Confirmar',
          onPress: () => {
            clearStorageAndContext();
          },
        },
      ]
    );
  };

  const clearStorageAndContext = async () => {
    try {
      await AsyncStorage.removeItem('teamA');
      await AsyncStorage.removeItem('teamB');
      FinalyGame();
      console.log('Partida encerrada. O armazenamento local foi limpo.');
    } catch (error) {
      console.error('Erro ao limpar o armazenamento:', error);
    }
  };

  const handleAddPoints = (player, points) => {
    Alert.alert(
      `Adicionar ${points} pontos`,
      `Deseja adicionar ${points} pontos ao jogador ${player.name}?`,
      [
        { text: 'Cancelar', onPress: () => console.log('Cancelado') },
        {
          text: 'Confirmar',
          onPress: () => {
            if (player.team === 'A') {
              increaseScoreA(); // Adiciona pontos à equipe A
            } else if (player.team === 'B') {
              increaseScoreB(); // Adiciona pontos à equipe B
            }
          },
        },
      ]
    );
  };

  const resetGame = ()=>{
    clearGame();
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.teamContainer}>
        <Text style={styles.teamTitle}>Equipe A</Text>
        {teamA.map((player) => (
          <View key={player.id} style={styles.playerContainer}>
            <Text style={styles.player}>{player.name}</Text>
            <View style={styles.buttonsContainer}>
              <Button title="2 pontos" onPress={() => handleAddPoints(player, 2)} />
              <Button title="3 pontos" onPress={() => handleAddPoints(player, 3)} />
            </View>
          </View>
        ))}
      </View>
      <View style={styles.teamContainer}>
        <Text style={styles.teamTitle}>Equipe B</Text>
        {teamB.map((player) => (
          <View key={player.id} style={styles.playerContainer}>
            <Text style={styles.player}>{player.name}</Text>
            <View style={styles.buttonsContainer}>
              <Button title="2 pontos" onPress={() => handleAddPoints(player, 2)} />
              <Button title="3 pontos" onPress={() => handleAddPoints(player, 3)} />
            </View>
          </View>
        ))}
      </View>
      <Text>Pontuação Equipe A: {scoreA}</Text>
      <Text>Pontuação Equipe B: {scoreB}</Text>
      <Button title="Finalizar Jogo" onPress={handleEndGame} />
      <Button title="Resetar Partida" onPress={resetGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  teamContainer: {
    marginBottom: 20,
  },
  teamTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  playerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  player: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
});

export default GamePage;
