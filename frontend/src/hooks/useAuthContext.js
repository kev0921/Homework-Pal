"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuthContext = void 0;
const AuthContext_1 = require("../context/AuthContext");
const react_1 = require("react");
const useAuthContext = () => {
    const context = (0, react_1.useContext)(AuthContext_1.AuthContext);
    if (!context) {
        throw Error('useContactsContext must be used inside a ContactsContextProvider');
    }
    return context;
};
exports.useAuthContext = useAuthContext;
