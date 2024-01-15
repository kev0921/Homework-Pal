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
const react_1 = require("@chakra-ui/react");
const useTasksContext_1 = require("../hooks/useTasksContext");
const react_2 = __importDefault(require("react"));
const useAuthContext_1 = require("../hooks/useAuthContext");
const TaskList = ({ task }) => {
    const { dispatch } = (0, useTasksContext_1.useTasksContext)();
    const { user } = (0, useAuthContext_1.useAuthContext)();
    const handleClick = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!user) {
            return;
        }
        const response = yield fetch('/api/tasks/' + task._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = yield response.json();
        if (response.ok) {
            dispatch({ type: 'DELETE_TASK', payload: json });
        }
    });
    return (react_2.default.createElement(react_1.SimpleGrid, { p: "20px" },
        react_2.default.createElement(react_1.Card, { align: "left", width: "50%", borderRadius: 20, boxShadow: "lg", bg: "gray.50", p: "20px" },
            react_2.default.createElement(react_1.Flex, { alignItems: "center", width: "100%" },
                react_2.default.createElement(react_1.Heading, { color: "blue.500" }, task.name),
                react_2.default.createElement(react_1.Spacer, null),
                react_2.default.createElement(react_1.Button, { onClick: handleClick }, "Delete")),
            react_2.default.createElement(react_1.Text, { textAlign: "left" }, task.subject),
            react_2.default.createElement(react_1.Text, { textAlign: "left" }, task.description))));
};
exports.default = TaskList;
