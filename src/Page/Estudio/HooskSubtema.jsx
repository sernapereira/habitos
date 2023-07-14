import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSubTemaAction,
  postSubTemaAction,
  putSubtemaAction,
} from "../../redux/action/estudioAction";

const useSuptema = () => {
  //========================= Variables ==============================//

  const dispatch = useDispatch();

  //============================= Estados global ==================== //

  const subTemaPut = useSelector((state) => state.estudio.subTemaPut);
  const subTemaPost = useSelector((state) => state.estudio.subTemaPost);

  //========================= Hoock predeterminados ========================//

  const textareaRef = useRef(null);

  //======================= estados local ========================//

  const [editarS, setEditarS] = useState(false);
  const [data, setData] = useState(null);
  const [formSub, setForm] = useState(null);
  const [eliminar, setEliminar] = useState(false);
  const [idEliminar, setIdEliminar] = useState(null);

  //======================== funciones de estados ========================//

  const editarHandler = (event) => {
    setEditarS(event);
  };

  const dataHandler = (event, subtemaID) => {
    let value = event.target.innerText;
    let name = event.target.id;

    setData({
      ...data,
      [name]: value,
      id: subtemaID,
    });
  };

  const putSubtemaHandler = () => {
    dispatch(putSubtemaAction(data));
    setData(null);
  };

  const formHandlerSubTema = (event) => {
    setForm(event);
  };

  const formHandlerCopy = (event, id) => {
    let name = event.target.name;
    let value = event.target.value;

    setForm({
      ...formSub,

      [name]: value,
      id: id,
    });
  };

  const postSubtemaHandler = (event) => {
    event.preventDefault();
    dispatch(postSubTemaAction(formSub));
    setForm(null);
  };

  const delateTema = () => {
    dispatch(deleteSubTemaAction(idEliminar));
    setEliminar(false);
    setIdEliminar(null);
  };

  const confirmaEliminado = (event, id) => {
    setIdEliminar({
      id: id,
    });
    setEliminar(event);
  };

  // ========================== Return =============================//

  return {
    editarS,
    subTemaPut,
    formSub,
    eliminar,
    idEliminar,
    data,
    formHandlerSubTema,
    editarHandler,
    formHandlerCopy,
    dataHandler,
    putSubtemaHandler,
    postSubtemaHandler,
    delateTema,
    confirmaEliminado,
  };
};

export default useSuptema;
