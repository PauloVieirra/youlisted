import React from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from "react-native";
import PlayerCard from "./Card";
import { players as allPlayers } from "./players";
import { useGameContext } from "../services/Context";

const Lista = () => {
  const { teamA, setTeamA, teamB, setTeamB } = useGameContext();
  const [availablePlayers, setAvailablePlayers] = React.useState([]);

  // Atualiza a lista de jogadores disponíveis excluindo os jogadores já presentes nas equipes A e B
  React.useEffect(() => {
    const playersInTeams = [...teamA, ...teamB];
    const playersAvailable = allPlayers.filter((player) => !playersInTeams.some((p) => p.id === player.id));
    // Ordena os jogadores disponíveis por número de partidas perdidas e depois por ordem de chegada
    const sortedPlayers = playersAvailable.sort((a, b) => {
      if (a.lostMatches !== b.lostMatches) {
        return a.lostMatches - b.lostMatches; // Jogadores com menos partidas perdidas primeiro
      }
      return a.arrivalOrder - b.arrivalOrder; // Em caso de empate, ordem de chegada
    });
    setAvailablePlayers(sortedPlayers);
  }, [teamA, teamB]);

  const handleAddPlayerToTeam = (player) => {
    if (teamA.length < 5) {
      setTeamA([...teamA, player]);
    } else if (teamB.length < 5) {
      setTeamB([...teamB, player]);
    } else {
      console.log("Ambas as equipes estão cheias.");
      return;
    }

    // Remove o jogador da lista disponível
    setAvailablePlayers((prevPlayers) => prevPlayers.filter((p) => p.id !== player.id));
  };

  const handlePlayerReturnToList = (player) => {
    const isPlayerInTeamA = teamA.some((p) => p.id === player.id);
    const isPlayerInTeamB = teamB.some((p) => p.id === player.id);
    if (isPlayerInTeamA || isPlayerInTeamB) {
      // Incrementa o contador de partidas perdidas do jogador
      const updatedPlayers = availablePlayers.map((p) => {
        if (p.id === player.id) {
          return { ...p, lostMatches: p.lostMatches + 1 };
        }
        return p;
      });
      setAvailablePlayers(updatedPlayers);
    }
  };
  
  
  

  return (
    <ScrollView style={styles.container}>
      {availablePlayers.sort((a, b) => a.arrivalOrder - b.arrivalOrder).map((player) => (
        <TouchableOpacity key={player.id} onPress={() => handleAddPlayerToTeam(player)}>
          <PlayerCard player={player} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default Lista;
