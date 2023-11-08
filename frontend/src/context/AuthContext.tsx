import React, { createContext, useReducer, ReactNode, Dispatch, useEffect } from 'react';

// Define the actions and state types
type AuthAction =
  | { type: any; payload: any[] }
  | { type: any; payload: any }
  | { type: any; payload: { _id: any } };

type AuthState = {
  user: any;
};

// Define the context type
interface AuthContextType {
  user: any;
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

    useEffect(() => {
        const userJSON = localStorage.getItem('user');
        if (userJSON) {
            const user = JSON.parse(userJSON);
            if (user) {
                dispatch({ type: 'LOGIN', payload: user });
            }
        }
    }, []);
    

    console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}