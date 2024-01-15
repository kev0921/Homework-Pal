"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLogout = void 0;
const useAuthContext_1 = require("./useAuthContext");
const useTasksContext_1 = require("./useTasksContext");
const useLogout = () => {
    const { dispatch } = (0, useAuthContext_1.useAuthContext)();
    const { dispatch: tasksDispatch } = (0, useTasksContext_1.useTasksContext)();
    const logout = () => {
        // Update global state
        // Remove user from local storage
        localStorage.removeItem('user');
        // Dispatch logout action
        dispatch({ type: 'LOGOUT', payload: undefined });
        tasksDispatch({ type: 'SET_TASKS', payload: [] });
    };
    return { logout };
};
exports.useLogout = useLogout;
