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
const react_3 = __importDefault(require("react"));
const Login = () => {
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        console.log(email, password);
    });
    return (react_3.default.createElement(react_2.Box, { p: "100px" },
        react_3.default.createElement("form", { className: "login", onSubmit: handleSubmit },
            react_3.default.createElement(react_2.Heading, null, "Log in"),
            react_3.default.createElement(react_2.FormControl, { id: "email" },
                react_3.default.createElement(react_2.FormLabel, null, "Email:"),
                react_3.default.createElement(react_2.Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value) })),
            react_3.default.createElement(react_2.FormControl, { id: "password" },
                react_3.default.createElement(react_2.FormLabel, null, "Password:"),
                react_3.default.createElement(react_2.Input, { type: "password", value: password, onChange: (e) => setPassword(e.target.value) })),
            react_3.default.createElement(react_2.Button, { type: "submit" }, "Log in"))));
};
exports.default = Login;
