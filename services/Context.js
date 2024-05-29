import React, { createContext, useContext, useState, useEffect } from 'react';
import { players } from '../data/players';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GameContext = createContext();

export const useGameContext = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }) => {
    const [teamA, setTeamA] = useState([]);
    const [teamB, setTeamB] = useState([]);
    const [scoreA, setScoreA] = useState(0);
    const [scoreB, setScoreB] = useState(0);
    const [availablePlayers, setAvailablePlayers] = useState([]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    console.log(scoreA, scoreB);
  
    const MAX_PLAYERS_IN_TEAM = 5;
    const WINNING_SCORE = 12;

    useEffect(() => {
      // Verifica se existe um usuário logado ao abrir o aplicativo
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
          setLoading(false); // Define o estado de loading como false após a verificação
      };
      checkUserLoggedIn();
  }, []);

    useEffect(() => {
        if (scoreA === WINNING_SCORE || scoreB === WINNING_SCORE) {
          clearGame();
        }
      }, [scoreA, scoreB]);
      
  
    useEffect(() => {
      setAvailablePlayers(players);
      loadTeamA();
      loadTeamB(); // Carrega a equipe B quando o componente for montado
    }, []);
  
    useEffect(() => {
      saveTeamA();
    }, [teamA]);
  
    useEffect(() => {
      saveTeamB();
    }, [teamB]);
  
    const loadTeamA = async () => {
      try {
        const teamAData = await AsyncStorage.getItem('teamA');
        if (teamAData) {
          setTeamA(JSON.parse(teamAData));
        }
      } catch (error) {
        console.error('Erro ao carregar o time A do AsyncStorage:', error);
      }
    };
  
    const loadTeamB = async () => {
      try {
        const teamBData = await AsyncStorage.getItem('teamB');
        if (teamBData) {
          setTeamB(JSON.parse(teamBData));
        }
      } catch (error) {
        console.error('Erro ao carregar o time B do AsyncStorage:', error);
      }
    };
  
    const saveTeamA = async () => {
      try {
        await AsyncStorage.setItem('teamA', JSON.stringify(teamA));
      } catch (error) {
        console.error('Erro ao salvar o time A no AsyncStorage:', error);
      }
    };
  
    const saveTeamB = async () => {
      try {
        await AsyncStorage.setItem('teamB', JSON.stringify(teamB));
      } catch (error) {
        console.error('Erro ao salvar o time B no AsyncStorage:', error);
      }
    };
  
    const increaseScoreA = () => {
        setScoreA(prevScoreA => prevScoreA + 1); // Atualiza o placar da equipe A com o valor atualizado
      };
      
      const increaseScoreB = () => {
        setScoreB(prevScoreB => prevScoreB + 1); // Atualiza o placar da equipe B com o valor atualizado
      };
      
      
      
  
    const addPlayerToTeam = (player) => {
      if (currentPlayerIndex >= availablePlayers.length || player !== availablePlayers[currentPlayerIndex]) {
        console.log("Jogador fora de ordem ou já adicionado.");
        return;
      }
  
      if (teamA.some(p => p.id === player.id)) {
        console.log("Jogador já está no time A.");
        return;
      }
  
      if (teamB.some(p => p.id === player.id)) {
        console.log("Jogador já está no time B.");
        return;
      }
  
      if (teamA.length < MAX_PLAYERS_IN_TEAM) {
        setTeamA([...teamA, player]);
      } else if (teamB.length < MAX_PLAYERS_IN_TEAM) {
        setTeamB([...teamB, player]);
      } else {
        console.log("Ambas as equipes estão cheias.");
        return;
      }
  
      const updatedPlayers = availablePlayers.filter(p => p.id !== player.id);
      setAvailablePlayers(updatedPlayers);
  
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    };
  
    const clearGame = async () => {
      try {
        if (scoreA === WINNING_SCORE) {
          await AsyncStorage.removeItem('teamB');
          setTeamB([]);
          setScoreB(0);
        } else if (scoreB === WINNING_SCORE) {
          await AsyncStorage.removeItem('teamA');
          setTeamA([]);
          setScoreA(0);
        }
        console.log('Partida encerrada. A equipe perdedora foi removida do armazenamento.');
      } catch (error) {
        console.error('Erro ao limpar o armazenamento e o contexto:', error);
      }
    };

    const FinalyGame = async () => {
      
            setTeamA([]);
            setTeamB([]);
            setScoreA(0);
            setScoreB(0);
       
   }

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
        
  
    return (
      <GameContext.Provider value={{ 
        teamA, 
        setTeamA, 
        teamB, 
        setTeamB, 
        scoreA, 
        setScoreA, 
        scoreB, 
        setScoreB, 
        increaseScoreA, 
        increaseScoreB, 
        addPlayerToTeam, 
        clearGame,FinalyGame,
        signInWithEmailAndPassword,
        signUpWithEmailAndPassword
        
        }}>
        {children}
      </GameContext.Provider>
    );
  };
  