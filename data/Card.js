import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';


const PlayerCard = ({ player }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.container}>
        <Image source={{ uri: player.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{player.name}</Text>
          <Text style={styles.details}>Age: {player.age}</Text>
          <Text style={styles.details}>Arrival Order: {player.arrivalOrder}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  container: {
    flexDirection: 'row',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  details: {
    fontSize: 14,
  },
});

export default PlayerCard;
