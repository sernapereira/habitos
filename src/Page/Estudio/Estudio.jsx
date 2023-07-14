import { useDispatch, useSelector } from "react-redux";
import dbPruebas from "../../Util/db/dbPrueba";
import style from "./Estudio.module.css";
import { useEffect, useRef } from "react";
import {
  getTemaAction,
  getTemaByIdAction,
} from "../../redux/action/estudioAction";
import { useParams } from "react-router-dom";
import useEstudio from "./HooskEstudio";
import useSuptema from "./HooskSubtema";
import DWGvisor from "../../components/DWGvisor/DWGvisor";

const Estudio = () => {
  //============================= variables =============================//

  const { id } = useParams();

  //================== estados globales  ====================//

  const temaID = useSelector((state) => state.estudio.temaID);
  const temas = useSelector((state) => state.estudio.temas);

  //================================= funciones auxiliares =========================//

  //============================== Hoosk ============================//

  const {
    form,
    editar,
    registerTextareaRef,
    onClickEditar,
    objetoHandler,
    manejarCambioArchivo,
    formHandler2,
    handleTextareaChange,
  } = useEstudio(id);
  const dispatch = useDispatch(id);

  const {
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
  } = useSuptema();

  //==S======================== Hoosk Predeterminados ================ //

  useEffect(() => {
    dispatch(getTemaAction());
    dispatch(getTemaByIdAction(id));
  }, [data, idEliminar, id, form, eliminar]);

  //==================================== Cuerpo =============== //

  return (
    <div className={style.page}>
      <div className={style.hoja}>
        {/* //=================== BUtton Guardar ======================== // */}

        <button
          className={style.guardar__button}
          onClick={() => {
            objetoHandler();
            putSubtemaHandler();
          }}
        >
          Guardar
        </button>

        {/* ==============================  encabezado ======================= */}

        {/* ========= titulo general ========*/}

        <header className={style.section__titulo_logo}>
          <h1
            id="titulo"
            contentEditable={true}
            onInput={(e) => formHandler2(e)}
            href={temaID?.guiasExternas?.map((elem) => elem.documentacion)}
            className={style.section__titulo}
            target="_blank"
          >
            {temaID?.titulo}
          </h1>

          {/* //========== logo general =====*/}

          <img
            className={style.section__logo}
            src={temaID?.imagenPrincipal}
            alt=""
          />
        </header>

        {/* //==== descripcion general === // */}

        <h1 className={style.title2_significado}>significado</h1>

        <h1
          className={style.section__contenido}
          id="descriccion"
          contentEditable={true}
          onInput={(e) => formHandler2(e)}
        >
          {temaID?.descriccion}
        </h1>

        {/* =================================== subtema =================================== */}

        <section className={style.subtema}>
          {temas?.map((tema) => {
            if (tema.id == id) {
              return tema.subtemas.map((elem, index) => (
                <div key={index} className={style.subtema__container}>
                  {/* ============================== Title ==================== */}

                  <h1 className={style.subtema__index}>{index + 1}</h1>

                  <h2
                    key={index}
                    className={style.subtema__title}
                    id="subTitulo"
                    contentEditable={true}
                    onInput={(e) => dataHandler(e, elem.id)}
                  >
                    {elem.subTitulo}
                  </h2>

                  {/* =============================== descripcion ================== */}

                  <div
                    className={style.subtema__subdescripcion}
                    contentEditable={true}
                    onInput={(e) => dataHandler(e, elem.id)}
                    id="subdescripcion"
                  >
                    {elem.subdescripcion}
                  </div>

                  {/* =============================== codigo ====================== */}

                  <div className={style.subtema__codigo}>
                    <h2 className={style.subtema__codigo_title}>Guia : </h2>
                    <p
                      className={style.subtema__codigo_p}
                      contentEditable={true}
                      onInput={(e) => dataHandler(e, elem.id)}
                      id="codigo"
                    >
                      {elem.codigo}
                    </p>
                  </div>

                  {/* ========================== ========== ================== */}
                  {/* ================== eliminar subtema ==================== */}
                  {!eliminar && (
                    <button
                      className={style.subtema__eliminar}
                      onClick={(e) => confirmaEliminado(true, elem.id)}
                    >
                      🗑
                    </button>
                  )}

                  {eliminar && (
                    <div
                      className={style.subtema__eliminar_confirmar_container}
                    >
                      <button
                        className={style.subtema__confimar_cancelar}
                        onClick={(e) => {
                          confirmaEliminado(false);
                        }}
                      >
                        Cancelar{" "}
                      </button>

                      <button
                        className={style.subtema__confimar_confirmar}
                        onClick={(e) => {
                          delateTema(), confirmaEliminado(false);
                        }}
                      >
                        Elimina ?{" "}
                      </button>
                    </div>
                  )}
                </div>
              ));
            }
          })}
          {/* ============================ agregar tema =================== */}
          <section className={style.agregar}>
            <button
              className={style.agregar__button}
              onClick={(e) => formHandlerSubTema(true)}
            >
              Agregar Tema{" "}
            </button>
          </section>

          {/* ======================= formulario de subtema ======================= */}

          {formSub && (
            <form className={style.formSubtema}>
              <h3>Tema</h3>
              <input
                type="text"
                className={style.formSubtema__titulo}
                onChange={(e) => formHandlerCopy(e, id)}
                name="subTitulo"
              />
              <h3>Notas</h3>
              <textarea
                className={style.formHandler__nota}
                onChange={(e) => {
                  formHandlerCopy(e, id), handleTextareaChange();
                }}
                name="subdescripcion"
                ref={registerTextareaRef}
              ></textarea>
              Ejemplos
              <textarea
                className={style.formHandler__guia}
                onChange={(e) => {
                  formHandlerCopy(e, id), handleTextareaChange();
                }}
                name="codigo"
                ref={registerTextareaRef}
              ></textarea>
              {/* ======================= button ==================  */}
              <button
                onClick={(e) => formHandlerSubTema(false)}
                className={style.formHandler__button_cancelar}
              >
                Cancelar
              </button>
              <button
                onClick={(e) => {
                  postSubtemaHandler(e), formHandlerSubTema(false);
                }}
                className={style.formHandler__button_enviar}
              >
                Enviar
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};

export default Estudio;
