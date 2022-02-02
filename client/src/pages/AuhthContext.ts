import React from "react";

interface AuthContextState {
  uri: string;
  session: boolean;
  setSession: any;
}

const defaultState = {
  uri: "https://api.socialrush.fr",
  session: false,
  setSession: () => {},
};

export const AuthContext = React.createContext<AuthContextState>(defaultState);
