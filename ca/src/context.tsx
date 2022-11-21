import React from "react";
import * as UTL from "./types/types";
import { SheetClass } from "./utility/Classes";
type GlobalContextType = {
  sheet: SheetClass;
  setSheet?: React.Dispatch<SheetClass>;
  userData: UTL.UserData;
  setUserData?: React.Dispatch<UTL.UserData>;
};
const GlobalContext = React.createContext<GlobalContextType>({
  sheet: new SheetClass(),
  userData: {
    userID: 0,
    username: "",
  },
});

type Props = {
  children: JSX.Element;
};

const GlobalContextProvider: React.FC<Props> = ({ children }) => {
  const [sheet, setSheet] = React.useState<SheetClass>(new SheetClass());
  const [userData, setUserData] = React.useState<UTL.UserData>({
    userID: 0,
    username: "",
  });
  return (
    <GlobalContext.Provider value={{ sheet, setSheet, userData, setUserData }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => React.useContext(GlobalContext);

export { GlobalContextProvider, useGlobalContext };
