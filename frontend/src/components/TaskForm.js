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
const useTasksContext_1 = require("../hooks/useTasksContext");
const useAuthContext_1 = require("../hooks/useAuthContext");
const react_2 = require("@chakra-ui/react");
const react_3 = __importDefault(require("react"));
const TaskForm = () => {
    const { dispatch } = (0, useTasksContext_1.useTasksContext)();
    const { user } = (0, useAuthContext_1.useAuthContext)();
    const [name, setName] = (0, react_1.useState)("");
    const [subject, setSubject] = (0, react_1.useState)("");
    const [description, setDescription] = (0, react_1.useState)("");
    const [error, setError] = (0, react_1.useState)('');
    const [emptyFields, setEmptyFields] = (0, react_1.useState)([]);
    const [formSubmitted, setFormSubmitted] = (0, react_1.useState)(false);
    const isError1 = name === "" && formSubmitted;
    const isError2 = subject === "" && formSubmitted;
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        setFormSubmitted(true);
        if (!user) {
            setError('You must be logged in');
            return;
        }
        const task = { name, subject, description };
        const response = yield fetch("/api/tasks", {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            },
        });
        const json = yield response.json();
        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            setName("");
            setSubject("");
            setDescription("");
            setError('');
            setEmptyFields([]);
            setFormSubmitted(false);
            console.log("new task added", json);
            dispatch({ type: "CREATE_TASK", payload: json });
        }
    });
    return (react_3.default.createElement(react_2.Box, null,
        react_3.default.createElement("form", { className: "create", onSubmit: handleSubmit },
            react_3.default.createElement(react_2.Heading, null, "Add a new task"),
            react_3.default.createElement(react_2.FormControl, { id: "name", isInvalid: isError1 },
                react_3.default.createElement(react_2.FormLabel, null, "Task Name"),
                react_3.default.createElement(react_2.Input, { type: "text", value: name, onChange: (e) => setName(e.target.value) }),
                !isError1 ? (react_3.default.createElement(react_2.FormHelperText, null, "Enter the name of the task")) : (react_3.default.createElement(react_2.FormErrorMessage, null, "Name is required."))),
            react_3.default.createElement(react_2.FormControl, { id: "subject", isInvalid: isError2 },
                react_3.default.createElement(react_2.FormLabel, null, "School Subject"),
                react_3.default.createElement(react_2.Input, { type: "text", value: subject, onChange: (e) => setSubject(e.target.value) }),
                !isError2 ? (react_3.default.createElement(react_2.FormHelperText, null, "Enter the school subject related to the task")) : (react_3.default.createElement(react_2.FormErrorMessage, null, "Subject is required."))),
            react_3.default.createElement(react_2.FormControl, { id: "description" },
                react_3.default.createElement(react_2.FormLabel, null, "Description"),
                react_3.default.createElement(react_2.Input, { type: "text", value: description, onChange: (e) => setDescription(e.target.value) })),
            react_3.default.createElement(react_2.Button, { type: "submit" }, "Add Task"),
            error && react_3.default.createElement(react_2.Box, { className: "error" }, error))));
};
exports.default = TaskForm;
