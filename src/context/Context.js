import React, { createContext, useContext, useReducer } from "react";
const StateContext = createContext();
const DispatchContext = createContext();
const initState = { hover: false };
const reducer = (state, action) => {
  switch (action.type) {
    case "HOVER":
      return { hover: action.hover };
    default:
      return { state };
  }
};
export const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
export const useAppState = () => useContext(StateContext);
export const useAppDispatch = () => useContext(DispatchContext);
