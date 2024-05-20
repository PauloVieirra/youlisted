import React, { createContext, useContext, useState } from 'react';



// Criação do contexto
const StyleContext = createContext();

// Componente provedor do contexto
export const StyleProvider = ({ children }) => {
  // Estado para o modo escuro
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Estado para o tamanho da fonte
  const [fontSize, setFontSize] = useState(16);

  // Função para alternar o modo escuro
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Função para aumentar o tamanho da fonte
  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 1);
  };

  // Função para diminuir o tamanho da fonte
  const decreaseFontSize = () => {
    setFontSize((prevSize) => prevSize - 1);
  };

  return (
    <StyleContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        fontSize,
        increaseFontSize,
        decreaseFontSize,
      }}
    >
      {children}
    </StyleContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useStyle = () => useContext(StyleContext);
