"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSignup = void 0;
const react_1 = require("react");
const useAuthContext_1 = require("./useAuthContext");
const useSignup = () => {
    const [error, setError] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const { dispatch } = (0, useAuthContext_1.useAuthContext)();
    const signup = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        setIsLoading(true);
        setError(null);
        const response = yield fetch('/api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const json = yield response.json();
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
    });
    return { signup, isLoading, error };
};
exports.useSignup = useSignup;
