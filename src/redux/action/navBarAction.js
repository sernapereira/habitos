import { valueHabito } from "../slice/navBarSlice";

const navBarAction = (value) => (dispatch) => {
  try {
    return value ? dispatch(valueHabito(value)) : dispatch(valueHabito(""));
  } catch (error) {
    console.log({ error: error.message });
    alert(error);
  }
};

export { navBarAction };
