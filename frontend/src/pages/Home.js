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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_2 = require("@chakra-ui/react");
const useContactsContext_1 = require("../hooks/useContactsContext");
const useAuthContext_1 = require("../hooks/useAuthContext");
const react_3 = __importDefault(require("react"));
// components
const ContactList_1 = __importDefault(require("../components/ContactList"));
const ContactForm_1 = __importDefault(require("../components/ContactForm"));
const Home = () => {
    const { contacts, dispatch } = (0, useContactsContext_1.useContactsContext)();
    const { user } = (0, useAuthContext_1.useAuthContext)();
    (0, react_1.useEffect)(() => {
        const fetchContacts = () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield fetch('/api/contacts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = yield response.json();
            if (response.ok) {
                dispatch({ type: 'SET_CONTACTS', payload: json });
            }
        });
        if (user) {
            fetchContacts();
        }
        fetchContacts();
    }, [dispatch, user]);
    return (react_3.default.createElement(react_2.Box, { className: "home", pt: "8%", ml: "5%" },
        react_3.default.createElement(react_2.Box, null,
            react_3.default.createElement(ContactForm_1.default, null)),
        react_3.default.createElement(react_2.Box, { className: "contacts" }, contacts && contacts.map((contact) => (react_3.default.createElement(ContactList_1.default, { key: contact._id, contact: contact }))))));
};
exports.default = Home;
