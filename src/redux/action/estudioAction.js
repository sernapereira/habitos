import axios from "axios";
import {
  deleteSubtema,
  getTemas,
  getTemasID,
  postTema,
  putSubtema,
  putTema,
} from "../slice/estudiosSlice";

const getTemaAction = () => async (dispatch) => {
  try {
    const json = await axios.get(`/temas`);
    return dispatch(getTemas(json.data));
  } catch (error) {
    console.log({ error: error.message });
    alert(error.message);
  }
};

const getTemaByIdAction = (id) => async (dispatch) => {
  try {
    const json = await axios.get(`/temas/${id}`);
    return dispatch(getTemasID(json.data));
  } catch (error) {
    console.log({ error: error.message });
    alert(error.message);
  }
};

const postTemaAction = (data) => async (dispatch) => {
  try {
    const json = await axios.post(`/temas/`, data);
    return dispatch(postTema(json.data));
  } catch (error) {
    console.log({ error: error.message });
    alert(error);
  }
};

const putTemaAction = (data) => async (dispatch) => {
  try {
    const json = await axios.put(`/temas/`, data);
    dispatch(putTema(json.data));
  } catch (error) {
    console.log({ error: error.message });
    alert(error);
  }
};

const putSubtemaAction = (data) => async (dispatch) => {
  try {
    const json = await axios.put(`/sub/`, data);
    dispatch(putSubtema(json.data));
  } catch (error) {
    console.log({ error: error.message });
    alert(error);
  }
};

const postSubTemaAction = (data) => async (dispatch) => {
  try {
    const json = await axios.post(`/sub/`, data);
    return dispatch(postTema(json.data));
  } catch (error) {
    console.log({ error: error.message });
    alert(error);
  }
};

const deleteSubTemaAction = (data) => async (dispatch) => {
  try {
    const json = await axios.delete(`/sub/${data.id}`);
    return dispatch(deleteSubtema(json.data));
  } catch (error) {
    console.log({ error: error.message });
    alert(error);
  }
};

export {
  getTemaAction,
  getTemaByIdAction,
  postTemaAction,
  putTemaAction,
  putSubtemaAction,
  postSubTemaAction,
  deleteSubTemaAction,
};
