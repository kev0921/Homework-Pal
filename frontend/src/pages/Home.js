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
const useTasksContext_1 = require("../hooks/useTasksContext");
const useAuthContext_1 = require("../hooks/useAuthContext");
const react_3 = __importDefault(require("react"));
// components
const TaskList_1 = __importDefault(require("../components/TaskList"));
const TaskForm_1 = __importDefault(require("../components/TaskForm"));
const Home = () => {
    const { tasks, dispatch } = (0, useTasksContext_1.useTasksContext)();
    const { user } = (0, useAuthContext_1.useAuthContext)();
    (0, react_1.useEffect)(() => {
        const fetchTasks = () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield fetch('/api/tasks', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = yield response.json();
            if (response.ok) {
                dispatch({ type: 'SET_TASKS', payload: json });
            }
        });
        if (user) {
            fetchTasks();
        }
        fetchTasks();
    }, [dispatch, user]);
    return (react_3.default.createElement(react_2.Box, { className: "home", pt: "8%", ml: "5%" },
        react_3.default.createElement(react_2.Box, null,
            react_3.default.createElement(TaskForm_1.default, null)),
        react_3.default.createElement(react_2.Box, { className: "tasks" }, tasks && tasks.map((task) => (react_3.default.createElement(TaskList_1.default, { key: task._id, task: task }))))));
};
exports.default = Home;
