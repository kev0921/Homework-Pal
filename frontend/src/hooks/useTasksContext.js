"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTasksContext = void 0;
const TaskContext_1 = require("../context/TaskContext");
const react_1 = require("react");
const useTasksContext = () => {
    const context = (0, react_1.useContext)(TaskContext_1.TasksContext);
    if (!context) {
        throw Error('useTasksContext must be used inside a TasksContextProvider');
    }
    return context;
};
exports.useTasksContext = useTasksContext;
