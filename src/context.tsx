import React from "react";
import { SheetClass } from "./utility/Classes";
type GlobalContextType = {
  sheet: SheetClass;
  setSheet?: React.Dispatch<SheetClass>;
};
const GlobalContext = React.createContext<GlobalContextType>({
  sheet: new SheetClass(),
});

type Props = {
  children: JSX.Element;
};

const GlobalContextProvider: React.FC<Props> = ({ children }) => {
  const [sheet, setSheet] = React.useState<SheetClass>(new SheetClass());
  return (
    <GlobalContext.Provider value={{ sheet, setSheet }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => React.useContext(GlobalContext);

export { GlobalContextProvider, useGlobalContext };
