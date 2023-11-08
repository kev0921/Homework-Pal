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
exports.AuthContextProvider = exports.authReducer = exports.AuthContext = void 0;
const react_1 = __importStar(require("react"));
// Create the context
exports.AuthContext = (0, react_1.createContext)(undefined);
const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
};
exports.authReducer = authReducer;
const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = (0, react_1.useReducer)(exports.authReducer, { user: null });
    (0, react_1.useEffect)(() => {
        const userJSON = localStorage.getItem('user');
        if (userJSON) {
            const user = JSON.parse(userJSON);
            if (user) {
                dispatch({ type: 'LOGIN', payload: user });
            }
        }
    }, []);
    console.log('AuthContext state: ', state);
    return (react_1.default.createElement(exports.AuthContext.Provider, { value: Object.assign(Object.assign({}, state), { dispatch }) }, children));
};
exports.AuthContextProvider = AuthContextProvider;
