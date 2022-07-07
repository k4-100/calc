import React from "react";

const GlobalContext = React.createContext(null);

const GlobalContextProvider = ({ children }) => {
  return (
    <GlobalContext.Provider value={{ tommy: 10 }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => React.useContext(GlobalContext);

export { GlobalContextProvider, useGlobalContext };
