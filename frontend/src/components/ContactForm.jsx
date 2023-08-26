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
const useContactsContext_1 = require("../hooks/useContactsContext");
const react_2 = require("@chakra-ui/react");
const react_3 = __importDefault(require("react"));
const ContactForm = () => {
    const { dispatch } = (0, useContactsContext_1.useContactsContext)();
    const [name, setName] = (0, react_1.useState)("");
    const [number, setNumber] = (0, react_1.useState)("");
    const [email, setEmail] = (0, react_1.useState)("");
    const [error, setError] = (0, react_1.useState)(null);
    const [emptyFields, setEmptyFields] = (0, react_1.useState)([]);
    const [formSubmitted, setFormSubmitted] = (0, react_1.useState)(false);
    const isError1 = name === "" && formSubmitted;
    const isError2 = number === "" && formSubmitted;
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        setFormSubmitted(true);
        const contact = { name, number, email };
        const response = yield fetch("/api/contacts", {
            method: "POST",
            body: JSON.stringify(contact),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = yield response.json();
        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            setName("");
            setNumber("");
            setEmail("");
            setError(null);
            setEmptyFields([]);
            setFormSubmitted(false);
            console.log("new contact added", json);
            dispatch({ type: "CREATE_CONTACT", payload: json });
        }
    });
    return (react_3.default.createElement(react_2.Box, null,
        react_3.default.createElement("form", { className: "create", onSubmit: handleSubmit },
            react_3.default.createElement(react_2.Heading, null, "Add a new contact"),
            react_3.default.createElement(react_2.FormControl, { id: "name", isInvalid: isError1 },
                react_3.default.createElement(react_2.FormLabel, null, "Contact Name"),
                react_3.default.createElement(react_2.Input, { type: "text", value: name, onChange: (e) => setName(e.target.value) }),
                !isError1 ? (react_3.default.createElement(react_2.FormHelperText, null, "Enter the contact's full name")) : (react_3.default.createElement(react_2.FormErrorMessage, null, "Name is required."))),
            react_3.default.createElement(react_2.FormControl, { id: "number", isInvalid: isError2 },
                react_3.default.createElement(react_2.FormLabel, null, "Contact Number"),
                react_3.default.createElement(react_2.Input, { type: "text", value: number, onChange: (e) => setNumber(e.target.value) }),
                !isError2 ? (react_3.default.createElement(react_2.FormHelperText, null, "Enter the contact's phone number")) : (react_3.default.createElement(react_2.FormErrorMessage, null, "Number is required."))),
            react_3.default.createElement(react_2.FormControl, { id: "email" },
                react_3.default.createElement(react_2.FormLabel, null, "Contact Email"),
                react_3.default.createElement(react_2.Input, { type: "text", value: email, onChange: (e) => setEmail(e.target.value) })),
            react_3.default.createElement(react_2.Button, { type: "submit" }, "Add Contact"),
            error && react_3.default.createElement(react_2.Box, { className: "error" }, error))));
};
exports.default = ContactForm;
