import React from "react";
import { TableClass } from "./utility/Classes";
type GlobalContextType = {
  table: TableClass;
  setTable?: React.Dispatch<TableClass>;
};
const GlobalContext = React.createContext<GlobalContextType>({
  table: new TableClass(1, 1),
});

type Props = {
  children: JSX.Element;
};

const GlobalContextProvider: React.FC<Props> = ({ children }) => {
  const [table, setTable] = React.useState<TableClass>(new TableClass(4, 3));
  return (
    <GlobalContext.Provider value={{ table, setTable }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => React.useContext(GlobalContext);

export { GlobalContextProvider, useGlobalContext };
