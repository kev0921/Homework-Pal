"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const react_1 = __importDefault(require("react"));
// pages and components
const Home_1 = __importDefault(require("./pages/Home"));
const Navbar_1 = __importDefault(require("./components/Navbar"));
const Login_1 = __importDefault(require("./pages/Login"));
const Signup_1 = __importDefault(require("./pages/Signup"));
function App() {
    return (react_1.default.createElement("div", { className: "App" },
        react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(Navbar_1.default, null),
            react_1.default.createElement("div", { className: "pages" },
                react_1.default.createElement(react_router_dom_1.Routes, null,
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(Home_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/login", element: react_1.default.createElement(Login_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/signup", element: react_1.default.createElement(Signup_1.default, null) }))))));
}
exports.default = App;
