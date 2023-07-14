import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTemaAction,
  getTemaByIdAction,
  putTemaAction,
} from "../../redux/action/estudioAction";

const useEstudio = (id) => {
  //=========================== estados Global ========================//

  //================================ estados Local ======================

  const [editar, setEditar] = useState(false);
  const [form, setForm] = useState(null);
  const [guardar, setGuardar] = useState(null);

  //=============================== Funciones de estado  ================

  const onClickEditar = (event) => {
    setEditar(event);
  };

  // const formHandler = (event) => {
  //   let value = event.target.value;
  //   let name = event.target.name;

  //   setForm({
  //     id: id,
  //     ...form,
  //     [name]: value,
  //   });
  // };

  const textareaRefs = useRef([]);

  const handleTextareaChange = () => {
    textareaRefs.current.forEach((textarea) => {
      textarea.style.height = "auto"; // Restablecer la altura a 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`; // Ajustar la altura al tamaño del contenido
    });
  };

  const registerTextareaRef = (ref) => {
    if (ref && !textareaRefs.current.includes(ref)) {
      textareaRefs.current.push(ref);
    }
  };

  //========================= variables en general ====================

  const dispatch = useDispatch();

  //=============================== subir fotos ====================
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

  const formHandler2 = (event) => {
    let value = event.target.innerText;
    let name = event.target.id;

    setForm({
      id: id,
      ...form,
      [name]: value,
    });
    guardarHandler(form);
  };

  const objetoHandler = () => {
    dispatch(putTemaAction(form));
    setForm(null);
  };

  // =========================== Return =======================

  return {
    form,
    editar,
    registerTextareaRef,
    onClickEditar,
    objetoHandler,
    manejarCambioArchivo,
    formHandler2,
    handleTextareaChange,
  };
};

export default useEstudio;
