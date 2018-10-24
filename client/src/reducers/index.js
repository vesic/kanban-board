import { combineReducers } from "redux";
import { getFromLocalStorage, setToLocalStorage } from "../localStorage";
import {
  INIT,
  UPDATE,
  ADD_TASK,
  UPDATE_ID,
  DESTROY_TASK,
  UPDATE_CAP
} from "../constants/types";

export const TASKS = "tasks";
export const COLUMNS = "columns";

let tasks = [], columns = [];

if (getFromLocalStorage(TASKS, null)) {
  tasks = [...getFromLocalStorage(TASKS, [])];
}

if (getFromLocalStorage(COLUMNS, null)) {
  columns = [...getFromLocalStorage(COLUMNS, [])];
} else {
  columns = [
    { name: "TO DO", stage: 1, cap: -1 },
    { name: "DOING", stage: 2, cap: -1 },
    { name: "DONE", stage: 3, cap: -1 }
  ];
}

const colReducer = (state = columns, action) => {
  switch (action.type) {
    case UPDATE_CAP:
      const { stage, cap } = action.payload;
      const cols = state.map(col => {
        if (col.stage === stage) {
          col.cap = cap;
        }
        return col;
      });
      setToLocalStorage(COLUMNS, cols); // todo: move from reducer
      return cols;
    default:
      return state;
  }
};

const tasksReducer = (state = tasks, action) => {
  switch (action.type) {
    case INIT:
      return action.payload;
    case UPDATE:
      const { task, stage } = action.payload;
      const tasks = state.map(t => {
        if (t.id === task.id) {
          t.stage = stage;
        }
        return t;
      });
      return tasks;
    case ADD_TASK:
      return [
        ...state,
        {
          name: action.payload.task,
          description: "",
          stage: action.payload.stage
        }
      ];
    case UPDATE_ID:
      return state.map(task => {
        if (!task.id) {
          task.id = action.payload;
        }
        return task;
      });
    case DESTROY_TASK:
      return state.filter(task => task.id !== action.payload);
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  columns: colReducer,
  tasks: tasksReducer
});

export default rootReducer;
