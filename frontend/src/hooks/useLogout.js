"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLogout = void 0;
const useAuthContext_1 = require("./useAuthContext");
const useLogout = () => {
    const { dispatch } = (0, useAuthContext_1.useAuthContext)();
    const logout = () => {
        // update global state
        // remove user from local storage    
        localStorage.removeItem('user');
        // dispatch logout action
        dispatch({ type: 'LOGOUT', payload: undefined });
    };
    return { logout };
};
exports.useLogout = useLogout;
