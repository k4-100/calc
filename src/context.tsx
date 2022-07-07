import React from "react";

type GlobalContextType = {
  txt: string;
};
const GlobalContext = React.createContext<GlobalContextType>({
  txt: "",
});

type Props = {
  children: JSX.Element;
};

const GlobalContextProvider: React.FC<Props> = ({ children }) => {
  return (
    <GlobalContext.Provider value={{ txt: "runs" }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => React.useContext(GlobalContext);

export { GlobalContextProvider, useGlobalContext };
