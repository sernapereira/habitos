import { useEffect, useState } from "react";
import {
  getTemaAction,
  postTemaAction,
} from "../../redux/action/estudioAction";
import { useDispatch, useSelector } from "react-redux";
import { navBarAction } from "../../redux/action/navBarAction";

const useNavBar = () => {
  const [section2, setSection2] = useState(false);
  const [newTema, setNewTema] = useState(false);
  const [form, setForm] = useState(null);

  const dispatch = useDispatch();
  const navHabito = useSelector((state) => state.navBarAction.navHabito);
  const temas = useSelector((state) => state.estudio.temas);

  // =========================== Manejo de Imagnes ====================//
  const manejarCambioArchivo = async (evento) => {
    const file = evento.target.files[0];
    let image = await uploadImage(file);
    setForm({
      ...form,
      imagenPrincipal: image,
    });
  };

  let cache = {};
  let uploadImage = async (file) => {
    try {
      if (cache.imag === file) {
        return img.secure_url;
      }
      cache.imag = file;

      let data = new FormData();

      data.append("file", file);
      data.append("upload_preset", "prueba");
      data.append("api_key", "612353432275849");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dkw9ck7qv/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      let img = await res.json();

      return img.secure_url;
    } catch (error) {
      console.log(error);
    }
  };

  // =============================== Funciones ==================//

  const handleMouseEnter = (event) => {
    let value = event.target.value;
    dispatch(navBarAction(value));
  };

  const activarForm = (event) => {
    setNewTema(event);
  };

  const formHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const enviarForm = (event) => {
    event.preventDefault();
    dispatch(postTemaAction(form));
    setNewTema(false);
  };

  return {
    newTema,
    section2,
    setSection2,
    handleMouseEnter,
    activarForm,
    formHandler,
    manejarCambioArchivo,
    enviarForm,
    navHabito,
    temas,
  };
};

export default useNavBar;
