import React from "react";

interface AuthContextState {
  session: boolean;
  setSession: any;
}

const defaultState = {
  session: false,
  setSession: () => {},
};

export const AuthContext = React.createContext<AuthContextState>(defaultState);
