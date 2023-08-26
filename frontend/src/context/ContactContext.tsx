import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';

// Define the actions and state types
type ContactsAction =
  | { type: 'SET_CONTACTS'; payload: any[] }
  | { type: 'CREATE_CONTACT'; payload: any }
  | { type: 'DELETE_CONTACT'; payload: { _id: any } };

type ContactsState = {
  contacts: any[];
};

// Define the context type
interface ContactsContextType {
  contacts: any[];
  dispatch: Dispatch<ContactsAction>;
}

// Create the context
export const ContactsContext = createContext<ContactsContextType | undefined>(undefined);

// Define the reducer function
const contactsReducer = (state: ContactsState, action: ContactsAction): ContactsState => {
  switch (action.type) {
    case 'SET_CONTACTS':
      return { contacts: action.payload };
    case 'CREATE_CONTACT':
      return { contacts: [action.payload, ...state.contacts] };
    case 'DELETE_CONTACT':
      return { contacts: state.contacts.filter(contact => contact._id !== action.payload._id) };
    default:
      return state;
  }
};

// Define the context provider
export const ContactsContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(contactsReducer, { contacts: [] });

  return (
    <ContactsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ContactsContext.Provider>
  );
};
