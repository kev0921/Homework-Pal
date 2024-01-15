import { useAuthContext } from "./useAuthContext"
import { useTasksContext } from "./useTasksContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: tasksDispatch } = useTasksContext();

    const logout = () => {
        // Update global state
        // Remove user from local storage
        localStorage.removeItem('user');

        // Dispatch logout action
        dispatch({ type: 'LOGOUT', payload: undefined });
        tasksDispatch({ type: 'SET_TASKS', payload: [] });
    }

    return { logout };
}
