"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLogout = void 0;
const useAuthContext_1 = require("./useAuthContext");
const useContactsContext_1 = require("./useContactsContext");
const useLogout = () => {
    const { dispatch } = (0, useAuthContext_1.useAuthContext)();
    const { dispatch: contactsDispatch } = (0, useContactsContext_1.useContactsContext)();
    const logout = () => {
        // Update global state
        // Remove user from local storage
        localStorage.removeItem('user');
        // Dispatch logout action
        dispatch({ type: 'LOGOUT', payload: undefined });
        contactsDispatch({ type: 'SET_CONTACTS', payload: [] });
    };
    return { logout };
};
exports.useLogout = useLogout;
