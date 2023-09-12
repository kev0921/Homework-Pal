"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const App_1 = __importDefault(require("./App"));
const react_2 = require("@chakra-ui/react");
const ContactContext_1 = require("./context/ContactContext");
const AuthContext_1 = require("./context/AuthContext");
react_dom_1.default.render(react_1.default.createElement(react_1.default.StrictMode, null,
    react_1.default.createElement(react_2.ChakraProvider, null,
        react_1.default.createElement(AuthContext_1.AuthContextProvider, null,
            react_1.default.createElement(ContactContext_1.ContactsContextProvider, null,
                react_1.default.createElement(App_1.default, null))))), document.getElementById('root'));
