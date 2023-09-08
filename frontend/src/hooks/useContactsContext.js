"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useContactsContext = void 0;
const ContactContext_1 = require("../context/ContactContext");
const react_1 = require("react");
const useContactsContext = () => {
    const context = (0, react_1.useContext)(ContactContext_1.ContactsContext);
    if (!context) {
        throw Error('useContactsContext must be used inside a ContactsContextProvider');
    }
    return context;
};
exports.useContactsContext = useContactsContext;
