import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';

// Define the actions and state types
type AuthAction =
  | { type: 'SET_CONTACTS'; payload: any[] }
  | { type: 'CREATE_CONTACT'; payload: any }
  | { type: 'DELETE_CONTACT'; payload: { _id: any } };

type AuthState = {
  user: any[];
};

// Define the context type
interface AuthContextType {
  user: any[];
  dispatch: Dispatch<AuthAction>;
}

// Create the context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const authReducer = (state: any, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null });

    console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}