import React from "react";
import { SheetClass } from "./utility/Classes";
type GlobalContextType = {
  sheet: SheetClass;
  setSheet?: React.Dispatch<SheetClass>;
  userID: number;
  setUserID?: React.Dispatch<number>;
};
const GlobalContext = React.createContext<GlobalContextType>({
  sheet: new SheetClass(),
  userID: 0,
});

type Props = {
  children: JSX.Element;
};

const GlobalContextProvider: React.FC<Props> = ({ children }) => {
  const [sheet, setSheet] = React.useState<SheetClass>(new SheetClass());
  const [userID, setUserID] = React.useState<number>(0);
  return (
    <GlobalContext.Provider value={{ sheet, setSheet, userID, setUserID }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => React.useContext(GlobalContext);

export { GlobalContextProvider, useGlobalContext };
