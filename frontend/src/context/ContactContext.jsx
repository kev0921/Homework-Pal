"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsContextProvider = exports.ContactsContext = void 0;
const react_1 = __importStar(require("react"));
// Create the context
exports.ContactsContext = (0, react_1.createContext)(undefined);
// Define the reducer function
const contactsReducer = (state, action) => {
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
const ContactsContextProvider = ({ children }) => {
    const [state, dispatch] = (0, react_1.useReducer)(contactsReducer, { contacts: [] });
    return (react_1.default.createElement(exports.ContactsContext.Provider, { value: Object.assign(Object.assign({}, state), { dispatch }) }, children));
};
exports.ContactsContextProvider = ContactsContextProvider;
