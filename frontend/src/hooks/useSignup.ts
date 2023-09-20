import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [error, setError] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { dispatch } = useAuthContext();

    const signup = async (email: any, password: any) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error || 'An error occurred');
        }
        if (response.ok) {
            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // Update the auth context with the LOGIN action
            dispatch({ type: 'LOGIN', payload: json });

            setIsLoading(false);
        }
    };

    return { signup, isLoading, error };
};
