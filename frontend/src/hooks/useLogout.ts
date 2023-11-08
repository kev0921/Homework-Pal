import { useAuthContext } from "./useAuthContext"
import { useContactsContext } from "./useContactsContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: contactsDispatch } = useContactsContext();

    const logout = () => {
        // Update global state
        // Remove user from local storage
        localStorage.removeItem('user');

        // Dispatch logout action
        dispatch({ type: 'LOGOUT', payload: undefined });
        contactsDispatch({ type: 'SET_CONTACTS', payload: [] });
    }

    return { logout };
}
