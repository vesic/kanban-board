import { setToLocalStorage } from "../localStorage";
import axios from "axios";
import { TASKS } from "../reducers";
import {
  INIT,
  UPDATE,
  ADD_TASK,
  UPDATE_ID,
  DESTROY_TASK,
  UPDATE_CAP
} from "../constants/types";
import { API_URL } from "../config";

export const init = () => async dispatch => {
  const res = await axios(`${API_URL}/tasks`);
  setToLocalStorage(TASKS, res.data);
  dispatch({
    type: INIT,
    payload: res.data
  });
};

export const updateServer = (task, stage) => async dispatch => {
  dispatch({
    type: UPDATE,
    payload: { task, stage }
  });
  const newTask = {
    name: task.name,
    description: "",
    stage: stage
  };
  await axios.put(`${API_URL}/tasks/${task.id}`, newTask);
  const all = await axios(`${API_URL}/tasks`);
  setToLocalStorage(TASKS, all.data);
};

export const addTask = (task, stage) => async dispatch => {
  dispatch({ type: ADD_TASK, payload: { task, stage } });
  const newTask = {
    name: task,
    description: "",
    stage: stage
  };
  const res = await axios.post(`${API_URL}/tasks`, newTask);
  dispatch({ type: UPDATE_ID, payload: res.data.id });
  const all = await axios(`${API_URL}/tasks`);
  setToLocalStorage(TASKS, all.data);
};

export const deleteTask = task => async dispatch => {
  const { id } = task;
  dispatch({ type: DESTROY_TASK, payload: id });
  await axios.delete(`${API_URL}/tasks/${task.id}`);
  const all = await axios(`${API_URL}/tasks`);
  setToLocalStorage(TASKS, all.data);
};

export const updateColumnCap = (stage, cap) => ({
  type: UPDATE_CAP,
  payload: { stage, cap }
});
