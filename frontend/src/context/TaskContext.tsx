import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';

// Define the actions and state types
type TasksAction =
  | { type: 'SET_TASKS'; payload: any[] }
  | { type: 'CREATE_TASK'; payload: any }
  | { type: 'DELETE_TASK'; payload: { _id: any } };

type TasksState = {
  tasks: any[];
};

// Define the context type
interface TasksContextType {
  tasks: any[];
  dispatch: Dispatch<TasksAction>;
}

// Create the context
export const TasksContext = createContext<TasksContextType | undefined>(undefined);

// Define the reducer function
const tasksReducer = (state: TasksState, action: TasksAction): TasksState => {
  switch (action.type) {
    case 'SET_TASKS':
      return { tasks: action.payload };
    case 'CREATE_TASK':
      return { tasks: [action.payload, ...state.tasks] };
    case 'DELETE_TASK':
      return { tasks: state.tasks.filter(task => task._id !== action.payload._id) };
    default:
      return state;
  }
};

// Define the context provider
export const TasksContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(tasksReducer, { tasks: [] });

  return (
    <TasksContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};
